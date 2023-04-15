const mongoose =  require("mongoose")


const userSchema = new mongoose.Schema({
    company_name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    country:{
        type:String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    website:{
        type:String,
    },
    city:{
        type:String,
        required: true
    },
    bio:{
        type: String,
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:["broker","operator","admin"]
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User