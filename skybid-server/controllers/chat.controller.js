const { Chat } = require("../models/chatModel");

exports.getConversations = async (req, res) => {

    const user_id = req.user._id;

    try{

        const conversations = await Chat.find({users : user_id})
        if (!conversations || conversations.length === 0){
           return res.json({ message: "User don't have conversations" })
        }

        res.json(conversations)

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching conversations" });
    }
}