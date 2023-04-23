exports.adminMiddleware = async (req, res, next) => {

    if (req.user.role === "operator") return next()
  
    return res.status(401).json({ message: "Unauthorized" })
  }