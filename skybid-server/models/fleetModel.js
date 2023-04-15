const mongoose = require("mongoose");

const fleetSchema = new mongoose.Schema({
    operator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    aircraft:{
        type:String,
        required:true,
    },
    image:{
        type: [String],
    },
    passengers:{
        type:Number,
        required:true
    },
    year_of_manufacture:{
        type:Number,
        required:true
    }

})

const Fleet = mongoose.model("Fleet",fleetSchema);

module.exports = Fleet