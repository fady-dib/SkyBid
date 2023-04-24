const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const socket_controller = require('./controllers/socket.controller')(io);
const {authMiddleware} = require('./middlewares/authMiddleware');
const {operatorMiddleware}= require('./middlewares/operatorMiddleware')
const { adminMiddleware } = require('./middlewares/adminMiddleware');


app.use(express.json())

app.use(cors())


const port = process.env.PORT || 3006;

const auth_router = require("./routes/auth.routes")
app.use('/auth', auth_router)

const user_router = require('./routes/user.routes')
app.use('/user', authMiddleware, user_router)

const operator_router = require('./routes/operator.routes')
app.use('/user', authMiddleware,operatorMiddleware, operator_router)

const admin_router = require('./routes/admin.routes');
app.use('/admin',authMiddleware, adminMiddleware, admin_router)

server.listen(port, (err) => {
    if (err) console.log (err)
    console.log("Server is running on port ", port);
    require("./config/db.config")
})