const User = require("../models/userModel");
const Request = require("../models/requestModel");

exports.getUsers = async (req,res) => {
    const users = await User.find()
    return res.json(users)
}