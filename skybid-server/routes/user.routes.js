const { Router } = require("express");
const router = Router();

const {updateProfile, getUser} = require("../controllers/user.controller")

router.post("/updateProfile", updateProfile);
router.get("/getUser/:id", getUser)


module.exports = router;