const { Router } = require("express");
const router = Router();

const { getConversations } = require("../controllers/chat.controller");

router.get("", getConversations);




module.exports = router;