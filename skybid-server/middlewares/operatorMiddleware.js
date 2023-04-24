exports.operatorMiddleware = async (req, res, next) => {

    if (req.user.role === "operator") return next()
  
    console.log("user type != operator")
    return res.status(401).json({ message: "Unauthorized" })
  }