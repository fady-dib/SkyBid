const { Router } = require("express");
const router = Router();

const {updateProfile, getUser, getRequest, getRequests} = require("../controllers/user.controller")

router.put("", updateProfile);
router.get("/:id", getUser)
router.get("/getRequest/:id", getRequest)
router.get("/requests", getRequests)


module.exports = router;