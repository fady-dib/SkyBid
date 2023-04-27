const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

const chatSchema = new mongoose.Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    messages:[messageSchema]
})

const Chat = mongoose.model("Chat",chatSchema);


module.exports = {Chat,Message}