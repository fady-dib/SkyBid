const User = require("../models/userModel");

exports.getUsers = async (req,res) => {
    const users = await User.find({ role: { $ne: 'admin' } })
    return res.json(users)
}