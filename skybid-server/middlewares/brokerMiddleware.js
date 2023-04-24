exports.brokerMiddleware = async (req, res, next) => {

    if (req.user.role === "broker") return next()

    console.log("user type != broker")
    return res.status(401).json({ message: "Unauthorized" })
    
  }