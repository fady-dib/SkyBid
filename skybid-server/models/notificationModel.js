const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver_id:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
}],
    type:{
        type:String,
        enum:["message","bid","request"],
        required:true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    notification:{
        type:String,
        required:true
    }
})

const Notification = mongoose.model("Notification",notificationSchema)

module.exports = Notification