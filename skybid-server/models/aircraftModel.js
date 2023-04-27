const mongoose = require("mongoose");

const aircraftSchema = new mongoose.Schema({
    operator_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    aircraft:{
        type:String,
        required:true,
    },
    images:{
        name:{
            type: String,
           required:true
        },
        image_type:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
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

const Aircraft = mongoose.model("Aircraft",aircraftSchema);

module.exports = Aircraft