const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server,{ cors:{
    origin: "*",
    // credentials : true,
  }});
const socket_controller = require('./controllers/socket.controller')(io);
const {authMiddleware} = require('./middlewares/authMiddleware');
const {operatorMiddleware}= require('./middlewares/operatorMiddleware')
const { adminMiddleware } = require('./middlewares/adminMiddleware');
const fileUpload = require("express-fileupload");
const path = require('path');



app.use(express.json())
// app.use(express.urlencoded({extended: true})); 
// app.use('/images', express.static(path.join(__dirname, '../images')));

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.use(cors())
app.use(fileUpload({maxFileSize: 10 * 1024 * 1024}));

const auth_router = require("./routes/auth.routes")
app.use('/auth', auth_router)

const user_router = require('./routes/user.routes')
app.use('/user', authMiddleware, user_router)

const aircraft_router = require('./routes/aircraft.routes')
app.use('/aircraft', authMiddleware,operatorMiddleware, aircraft_router)

const chat_router = require('./routes/chat.routes')
app.use('/chats', authMiddleware, chat_router)

const admin_router = require('./routes/admin.routes');
app.use('/admin',authMiddleware, adminMiddleware, admin_router)


server.listen(process.env.PORT, (err) => {
    if (err) console.log (err)
    console.log("Server is running on port ", process.env.PORT||3007);
    require("./config/db.config")
})