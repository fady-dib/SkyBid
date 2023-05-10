const { Router } = require("express");
const router = Router();

const { getConversations, getChatById } = require("../controllers/chat.controller");

router.get("", getConversations);
router.get('/:id',getChatById)




module.exports = router;