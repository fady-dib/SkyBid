const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
}],
    type:{
        type:String,
        enum:["message","bid","request"],
        required:true
    },
    notification:{
        type:String,
        required:true
    }
},{timestamps : true})

const Notification = mongoose.model("Notification",notificationSchema)

module.exports = Notification