const { Router } = require("express");
const router = Router();

const register = require("../controllers/auth.contollers")

router.post("/register", register);

module.exports = router;