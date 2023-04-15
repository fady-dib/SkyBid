const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver_id:{
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
    user_id_1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    user_id_2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    messages:[messageSchema]
})

const Chat = mongoose.model("Chat",chatSchema);


module.exports = {Chat,Message}