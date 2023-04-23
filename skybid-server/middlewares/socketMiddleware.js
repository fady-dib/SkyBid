const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthenticated"));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id, "-password");

    socket.user = user;

    next();
  } catch (e) {
    return next(new Error("Server Error"));
  }
}
