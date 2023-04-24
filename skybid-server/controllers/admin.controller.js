const User = require("../models/userModel");
const Request = require("../models/requestModel");

exports.getUsers = async (req,res) => {
    const users = await User.find({ role: { $ne: 'admin' } })
    return res.json(users)
}

exports.getRequests = async (req,res) => {
    const Requests = await Request.find()
    return res.json(Requests)
}