const { Router } = require("express");
const router = Router();

const {updateProfile, getUser, getRequest, getRequests, getBidsByRequestID, getRequestsByBroker} = require("../controllers/user.controller")

router.put("", updateProfile);
router.get("/requests", getRequests)
router.get("/getRequest/:id", getRequest)
router.get("/bids",getBidsByRequestID)
router.get("", getUser);
router.get("/broker-requests", getRequestsByBroker)




module.exports = router;