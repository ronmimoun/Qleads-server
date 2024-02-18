const supportChatService = require("./supportChat.service")

//CREATE
async function create(req, res) {
    try {
        const { userId, message, isUserSender } = req.body
        const userChat = await supportChatService.getById(userId)
        let newMessage = null

        if (userChat) {
            newMessage = await supportChatService.addMessageToChat(userChat, message, isUserSender)
        } else {
            const newChatWithNewMessage = await supportChatService.createChat(userChat, message)
            newMessage = await supportChatService.addMessageToChat(newChatWithNewMessage.chatId, message, isUserSender)
        }

        res.status(200).json({ status: 'ok', content: newMessage });
    } catch (err) {
        res.status(500).json(err);
    }
}

async function addAdminMsg(req, res) {
    try {
        const { receiverId, message, userId } = req.body
        const newMessage = await supportChatService.addAdminMessageToChat(receiverId, userId, message)
        res.status(200).json({ status: 'ok', content: newMessage });
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL
async function query(req, res) {
    try {
        const chatId = req.query.params;
        let supportChat = null
        if (chatId) {
            supportChat = await supportChatService.getById(chatId)
        } else {
            supportChat = await supportChatService.get(chatId)
        }
        res.status(200).json({ status: 'ok', content: supportChat })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

// GET BY ID
async function getById(req, res) {
    try {
        const userId = req.params.id;
        supportChat = await supportChatService.getById(userId)

        if (!supportChat) supportChat = await supportChatService.createRoom(userId)

        res.status(200).json({ status: 'ok', content: supportChat })
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    query,
    create,
    addAdminMsg,
    getById,
};