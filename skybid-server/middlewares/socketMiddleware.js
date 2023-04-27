const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.socketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.query.token

    if (!token) {
      return next(new Error("Unauthenticated"));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id, "-password");
    if (!user) {
        console.log("User not found");
        return next(new Error("Unauthenticated"));
      }

    socket.user = user;

    next();
  } catch (e) {
    console.log("Error:", e);
    return next(new Error("Server Error"));
  }
}
