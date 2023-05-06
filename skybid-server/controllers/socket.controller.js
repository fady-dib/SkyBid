const { socketMiddleware } = require("../middlewares/socketMiddleware");
const Request = require("../models/requestModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const short_id = require('shortid')

// let users = [];

module.exports = function (io) {

    io.use(socketMiddleware);

    io.on('connection', (socket) => {

        // const user_id = socket.user._id
        // const socket_id = socket.id
        // const user_index = users.findIndex(user => user.user_id === user_id);
        // if (user_index === -1) {
        //     users.push({ user_id, socket_id })
        //  } 
        // else {
        //     users[user_index].socket_id = socket_id
        // }
        // console.log(users)


        function joinRooms(socket) {
            if (socket.user.role === "operator") {
                socket.join("operators");
                Request.find({})
                    .then(requests => {
                        requests.forEach(request => {
                            socket.join(request._id.toString());
                        });
                    })
                    .catch(err => {
                        console.error('Error fetching requests for operator:', err);
                    });
        
            } else if (socket.user.role === "broker") {
                socket.join("brokers");
                Request.find({ broker: socket.user._id })
                    .then(requests => {
                        requests.forEach(request => {
                            socket.join(request._id.toString());
                        });
                    })
                    .catch(err => {
                        console.error('Error fetching requests for broker:', err);
                    });
            }
        }

        joinRooms(socket)

        // if (socket.user.role === "operator") {
        //     socket.join("operators")
        // }
        // else if (socket.user.role === "broker") {
        //     socket.join("brokers")
        // }

        console.log(`Client ${socket.id} connected`);


        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`);
            // const user_index = users.findIndex(user => user.user_id === user_id);
            // if (user_index !== -1) {
            //     users.splice(user_index, 1);
            // }
            // console.log(users)
        });

        socket.on('chatMessage', (msg) => {
            console.log('message: ' + msg);
            io.emit('chatMessage', msg);
        });

        socket.use((packet, next) => {
            if (packet[0] === 'createRequest') {
                if (!socket.user || socket.user.role !== 'broker') {
                    return next(new Error('Unauthorized'));
                }
            }
            next();
        });

        socket.on('createRequest', async (request) => {
            const broker = socket.user._id
            const newRequest = new Request({
                broker,
                trip: request.trip,
                passengers: request.passengers,
                luggage: request.luggage,
                from: request.from,
                to: request.to,
                departure_date: request.departure_date,
                return_date: request.return_date,
                status: "pending",
            });

            await newRequest.save();
            const operators = await User.find({ role: "operator" });
            const request_id = newRequest.id
            console.log(request_id)
            socket.join(request_id)
            io.in("operators").socketsJoin(request_id)
            const notification = new Notification({
                sender: broker,
                receiver: operators.map(operator => operator._id),
                type: "request",
                notification: `A new request has been created`
            })
            await notification.save()
            io.to(request_id).emit('notification', newRequest, notification)
            const requests = await Request.find().populate('broker');
            io.emit("getRequests", requests)
            console.log("newRequest",request_id)
            // io.emit("notification",notification.notification)

        })


        socket.on("newBid", async (bid, req) => {
            const request_id = req._id
            const new_bid = {
                operator: socket.user._id,
                aircraft: bid.aircraft,
                price: bid.price
            };
            const request = await Request.findOneAndUpdate({ _id: request_id }, { $push: { bids: new_bid } },)
            if (!request) {
                return "request not found";
            }
            const notification = new Notification({
                sender: socket.user._id,
                receiver: [req.broker],
                type: "bid",
                notification: `A new bid has been submitted`
            });
            await notification.save();
            const bids = await Request.findOne({ _id: request_id }).populate({
                path: 'bids.operator',
                select: 'company_name _id' 
              })
              .populate({
                path: 'bids.aircraft',
                select: 'aircraft year_of_manufacture' 
              })
              .select('bids')
            // io.emit('newBid', new_bid, request_id);
            io.to(request_id).emit('notification', notification)
            console.log("newBid",request_id)
        })




    });
}

