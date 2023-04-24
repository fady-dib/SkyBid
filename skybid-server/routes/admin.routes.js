const { Router } = require("express");
const router = Router();

const {getUsers, getRequests} = require("../controllers/admin.controller")

router.get("/getUsers", getUsers);
router.get("/getRequests", getRequests)


module.exports = router;