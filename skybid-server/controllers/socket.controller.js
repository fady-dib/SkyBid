const { authMiddleware } = require("../middlewares/socketMiddleware");
const Request = require("../models/requestModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

module.exports = function (io) {

    io.on('connection', (socket) => {

        authMiddleware(socket, (err) => {
            if (err) {
              console.error(err);
              return socket.disconnect(true);
            }
        })

        console.log(`Client ${socket.id} connected`);

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`);
        });

        socket.on('chatMessage', (msg) => {
            console.log('message: ' + msg);
            io.emit('chatMessage', msg);
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
            const operatorIds = operators.map(operator => operator._id.toString());
            socket.join(operatorIds);
            const notification = new Notification({
                sender_id: request.broker_id,
                receiver_id: operators.map(operator => operator._id),
                type: "request",
                notification: `A new request has been created`
            })
            await notification.save()
            io.to(operatorIds).emit('notification', newRequest, notification)

        })


    });
}

