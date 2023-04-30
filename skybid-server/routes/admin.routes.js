const { Router } = require("express");
const router = Router();

const {getUsers} = require("../controllers/admin.controller")

router.get("/getUsers", getUsers);


module.exports = router;