const { Router } = require("express");
const router = Router();

const {getUsers} = require("../controllers/admin.controller")

router.get("/users", getUsers);


module.exports = router;