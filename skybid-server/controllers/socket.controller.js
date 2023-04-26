const { socketMiddleware } = require("../middlewares/socketMiddleware");
const Request = require("../models/requestModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

module.exports = function (io) {

    io.use(socketMiddleware);

    io.on('connection', (socket) => {

        socket.on('subscribeOperatorsToRoom', (operatorsRoom) => {
           
            const operatorSockets = Object.values(io.sockets.sockets).filter(s => s.user && s.user.role === 'operator');
        
            operatorSockets.forEach(s => s.join(operatorsRoom));
          });
       

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
          
            const newRequest = new Request({
                broker_id: request.broker_id,
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

            const operatorSockets = Object.keys(io.sockets.sockets)
                .filter(socketId => operators.some(operator => operator._id.equals(io.sockets.sockets[socketId].user._id)));
            operatorSockets.forEach(socketId => io.sockets.sockets[socketId].join("operators"));
            
            const notification = new Notification({
                sender_id: request.broker_id,
                receiver_id: operators.map(operator => operator._id),
                type: "request",
                notification: `A new request has been created`
            })
            await notification.save()
            io.to(operatorsRoom).emit('notification', newRequest, notification)
            const requests = await Request.find();
            io.emit("getRequests", requests)
        
        })
    

        socket.on("newBid", async (bid) => {
            const request_id = bid.request_id
            const request = await Request.findById(request_id)
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

