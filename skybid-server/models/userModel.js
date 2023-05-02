const mongoose =  require("mongoose")
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

const User = mongoose.model("User",userSchema);

module.exports = User