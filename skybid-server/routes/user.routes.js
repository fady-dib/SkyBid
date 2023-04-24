const { Router } = require("express");
const router = Router();

const {updateProfile} = require("../controllers/user.controller")

router.post("/updateProfile", updateProfile);


module.exports = router;