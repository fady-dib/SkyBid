const { Router } = require("express");
const router = Router();

const {updateProfile, getUser, getRequest} = require("../controllers/user.controller")

router.post("/updateProfile", updateProfile);
router.get("/getUser/:id", getUser)
router.get("/getRequest/:id", getRequest)


module.exports = router;