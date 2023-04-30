const { Router } = require("express");
const router = Router();

const {updateProfile, getUser, getRequest, getRequests} = require("../controllers/user.controller")

router.put("", updateProfile);
router.get("/requests", getRequests)
router.get("/getRequest/:id", getRequest)
router.get("/:id", getUser);



module.exports = router;