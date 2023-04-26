const { Router } = require("express");
const router = Router();

const {updateProfile, getUser, getRequest} = require("../controllers/user.controller")

router.put("", updateProfile);
router.get("/:id", getUser)
router.get("/getRequest/:id", getRequest)


module.exports = router;