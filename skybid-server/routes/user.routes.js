const { Router } = require("express");
const router = Router();

const {updateProfile, getUser, getRequest, getRequests, getBidsByRequestID, getRequestsByBroker, deleteRequest, updateRequest} = require("../controllers/user.controller")

router.put("", updateProfile);
router.get("/requests", getRequests)
router.get("/getRequest/:id", getRequest)
router.get("/bids",getBidsByRequestID)
router.get("", getUser);
router.get("/broker-requests", getRequestsByBroker)
router.delete("/:id", deleteRequest)
router.post('/accept-bid', updateRequest)




module.exports = router;