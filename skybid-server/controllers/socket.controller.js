const { authMiddleware } = require("../middlewares/socketMiddleware");

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

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });


    });
}

