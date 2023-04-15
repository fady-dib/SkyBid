const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    operator_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    aircraft:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Fleet",
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const requestSchema = new mongoose.Schema({
    broker_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    trip:{
        type:String,
        required:true
    },
    passengers:{
        type:Number,
        required:true
    },
    luggage:{
        type:Number,
        reqiured:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    Departure_date:{
        type:Date,
        required:true
    },
    return_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["pending","closed"]
    },

    bids:[bidSchema]
})

const Request = mongoose.model("Request",requestSchema);

module.exports = Request