const { Chat } = require("../models/chatModel");

exports.getConversations = async (req, res) => {
    const user_id = req.user._id;

    try {
        const conversations = await Chat.find({ users: user_id }).populate('users','-password');
        if (!conversations || conversations.length === 0) {
            return res.json({ message: "User doesn't have conversations" });
        }

        const modifiedConversations = conversations.map((conversation) => {
            
            const conversationObj = conversation.toObject();

            conversationObj.users = conversationObj.users.filter(user => !user._id.equals(user_id));
            if (conversationObj.users.length === 1) {
                conversationObj.users = conversationObj.users[0];
            }

            return conversationObj;
        });

        res.json(modifiedConversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching conversations" });
    }
};

exports.getChatById = async (req,res) => {
    const chat_id = req.params.id
    if(!chat_id) return res.json(" Invalid chat ID")
    try{

        const chat = await Chat.find({_id : chat_id})
        if (!chat) return res.json("Chat not found")
        return res.json(chat)
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating request", error });
      }
}
