const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const socket_controller = require('./controllers/socket.controller')(io)


app.use(express.json())

app.use(cors())




const port = process.env.PORT || 3006;

const auth_router = require("./routes/auth.routes")
app.use('/auth', auth_router)

server.listen(port, (err) => {
    if (err) console.log (err)
    console.log("Server is running on port ", port);
    require("./config/db.config")
})