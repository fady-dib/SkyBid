const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    operator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    aircraft:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Aircraft",
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const requestSchema = new mongoose.Schema({
    broker:{
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
    departure_date:{
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