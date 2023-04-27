const { socketMiddleware } = require("../middlewares/socketMiddleware");
const Request = require("../models/requestModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const short_id = require('shortid')

module.exports = function (io) {

    io.use(socketMiddleware);

    io.on('connection', (socket) => {

        if(socket.user.role === "operator") {
            socket.join("operators")
        }
        else if(socket.user.role ==="broker"){
            socket.join("brokers")
        }

        console.log(`Client ${socket.id} connected`);

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`);
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
             const broker_id = socket.user._id
            const newRequest = new Request({
                broker_id,
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
            const request_id = newRequest._id
            console.log(request_id)
            socket.join(request_id)
            io.in("operators").socketsJoin(request_id)
            const notification = new Notification({
                sender_id: broker_id,
                receiver_id: operators.map(operator => operator._id),
                type: "request",
                notification: `A new request has been created`
            })
            await notification.save()
            io.to(request_id).emit('notification', newRequest, notification)
            const requests = await Request.find();
            io.emit("getRequests", requests)
        
        })
    

        socket.on("newBid", async (bid) => {
            const request_id = bid.request_id
            const request = await Request.findById({request_id})
            if (!request) {
                return "request not found";
            }
            const new_bid = {
                operator_id: socket.user._id,
                aircraft: bid.aircraft,
                price: bid.price
            };
            request.bids.push(new_bid);
            await request.updateOne({ bids: request.bids });
            const notification = new Notification({
                sender_id: socket.user._id,
                receiver_id: [request.broker_id],
                type: "bid",
                notification: `A new bid has been submitted`
              });
              await notification.save();

        })




    });
}

