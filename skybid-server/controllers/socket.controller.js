const { socketMiddleware } = require("../middlewares/socketMiddleware");
const Request = require("../models/requestModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const short_id = require('shortid');
const { Chat } = require("../models/chatModel");

let users = [];

module.exports = function (io) {

    io.use(socketMiddleware);

    io.on('connection', (socket) => {

        const user_id = socket.user._id
        const socket_id = socket.id
        const user_index = users.findIndex(user => user.user_id === user_id);
        if (user_index === -1) {
            users.push({ user_id, socket_id })
         } 
        // else {
        //     users[user_index].socket_id = socket_id
        // }


         function joinRooms(socket)  {
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

             Chat.find({users : user_id})
             .then(chats => {
                chats.forEach(chat => {
                    socket.join(chat._id.toString())
                })
             })
             .catch(err => {
                console.error('Error fetching requests for broker:', err);
            });


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
            const user_index = users.findIndex(user => user.user_id === user_id);
            if (user_index !== -1) {
                users.splice(user_index, 1);
            }
        });

        socket.on('chatMessage', async (msg) => {

            sender = socket.user._id
            receiver = msg.receiver
            try {
            const chat = await Chat.findOne({ users : {$all: [sender,receiver]}})
            if(chat){
                chat.messages.push({
                    sender: sender,
                    receiver: receiver,
                    message : msg.msg,
                });
                await chat.save();
                io.to(chat._id.toString()).emit('chatMessage', chat.messages);
            }
            else{
                const new_chat = new Chat({
                    users: [sender,receiver],
                    messages:{
                        sender: sender,
                        receiver: receiver,
                        message : msg.msg,
                    }
                })
                await new_chat.save()
                socket.join(new_chat._id.toString())
              const user = users.find(user => user.user_id == receiver)
              if(user){
                const receiver_socket = io.sockets.sockets.get(user.socket_id)
                console.log(receiver_socket)
                receiver_socket.join(new_chat._id.toString())
              }
              io.to(new_chat._id.toString()).emit('chatMessage', new_chat.messages);
            }
        }
        catch (error) {
            console.error('Error handling chat message:', error);
        }
            
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
            try{
            const broker = socket.user.id
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
            const request_id = newRequest._id
            console.log(request_id)
            socket.join(request_id.toString())
            io.in("operators").socketsJoin(request_id.toString())
            const notification = new Notification({
                sender: broker,
                receiver: operators.map(operator => operator._id),
                type: "request",
                notification: `A new request has been created`
            })
            await notification.save()
            io.to(request_id.toString()).emit('notification', notification.notification)
            const requests = await Request.find({status : 'pending'}).populate('broker');
            io.emit("getRequests", requests)
            console.log("newRequest",request_id)
        }catch (error) {
            console.error("Error in createRequest event:", error);
        }
        })

     
        socket.on('deleteRequest', async (request_id) => {
            try {
       
              const deleted_request = await Request.findByIdAndDelete(request_id);
              const broker = socket.user._id;
              const operators = await User.find({ role: 'operator' });
              const notification = new Notification({
                sender: broker,
                receiver: operators.map(operator => operator._id),
                type: 'request',
                notification: `A request has been deleted`
              });
          
              await notification.save();
              
          
              const requests = await Request.find({status : 'pending'}).populate('broker');
              io.to(request_id.toString()).emit('notification', notification.notification);
              io.emit('getRequests', requests);
          
              console.log('Request deleted:', request_id);
            } catch (error) {
              console.error('Error in deleteRequest event:', error);
            }
          });


        socket.on("newBid", async (bid, req) => {
            try{
            const request_id = req.request_id
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
                receiver: [req.broker_id],
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
            io.to(request_id.toString()).emit('notification', notification.notification)
            console.log("newBid",request_id)
            }catch (error) {
                console.error("Error in createRequest event:", error);
            }
        })


        socket.on("updateRequest", async (req) => {
            try{
            const request_id = req.request_id
            if(!request_id) return " Invalid request ID"
            const update_request = await Request.findOneAndUpdate(
                {_id : request_id},
                {$set : {status: 'closed'}}
            );
            if (!update_request) {
                return "Request not found";
              }
              const operators = await User.find({ role: 'operator' });
            const notification = new Notification({
                sender: socket.user._id,
                receiver: operators.map(operator => operator._id),
                type: "request",
                notification: `A request has been closed`
            });
            await notification.save();
            
            io.to(request_id.toString()).emit('notification', notification.notification)
            const requests = await Request.find({status : 'pending'}).populate('broker');
            io.emit('getRequests', requests);
            }catch (error) {
                console.error("Error in createRequest event:", error);
            }
        })

    });
}

