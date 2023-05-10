const { Chat } = require("../models/chatModel");

exports.getConversations = async (req, res) => {
    const user_id = req.user._id;

    try {
        const conversations = await Chat.find({ users: user_id }).populate('users');
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
