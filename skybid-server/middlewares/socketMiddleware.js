const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.query.token

    if (!token) {
      return next(new Error("Unauthenticated"));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded);
    const user = await User.findById(decoded.id, "-password");
    console.log("User:", user);
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
