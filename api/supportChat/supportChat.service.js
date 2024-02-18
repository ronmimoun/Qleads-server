const ObjectId = require('mongodb').ObjectId
const SupportChat = require('./supportChat.model')
const userService = require('../user/user.service')
const apiUtilService = require('../../utils/api.utils')

async function get(chatId = '') {
    try {
        const criteria = _buildCriteria({ chatId })
        const chat = await SupportChat.find(criteria);
        return chat
    } catch (err) {
        throw err
    }
}

async function getById(chatId = '') {
    try {
        const criteria = _buildCriteria({ chatId })
        const chat = await SupportChat.findOne(criteria);
        return chat
    } catch (err) {
        throw err
    }
}

async function addMessageToChat(userChat, text, isUserSender = true) {
    try {

        const newMessage = {
            senderId: userChat.chatId,
            senderName: userChat.fullname,
            receiverId: null,
            content: text,
            createdAt: new Date(),
            isRead: false,
            isUserSender,
        };

        await SupportChat.updateOne({ chatId: userChat.chatId }, { $push: { messages: newMessage } })
        return newMessage
    } catch (error) {
        throw error
    }
}

async function addAdminMessageToChat(receiverId, currentUserId, text) {
    try {
        const adminUser = await userService.getById(currentUserId)

        const newMessage = {
            senderId: currentUserId,
            senderName: adminUser.fullname,
            receiverId,
            content: text,
            createdAt: new Date(),
            isRead: false,
            isUserSender: false,
        };

        await SupportChat.updateOne({ chatId: receiverId }, { $push: { messages: newMessage } })
        return newMessage
    } catch (error) {
        throw error
    }
}

async function createChat(chat) {
    try {
        const userChat = await userService.getById(chat.chatId)

        const newChat = await new SupportChat({
            chatId: userChat._id,
            chatImg: userChat.imgUrl,
            fullname: userChat.fullname,
            username: userChat.username,
            messages: [],
        }).save()

        return newChat;
    } catch (error) {
        throw error
    }
}

async function createRoom(userId) {
    try {
        const user = await userService.getById(userId)
        if (!user) throw new Error(apiUtilService.buildErrorResponse('Cannot find user'))

        const newChat = await new SupportChat({
            chatId: user._id,
            chatImg: user.imgUrl,
            fullname: user.fullname,
            username: user.username,
            messages: [],
        }).save()

        return newChat;
    } catch (error) {
        throw error
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.chatId) {
        criteria.chatId = filterBy.chatId
    }

    return criteria
}


module.exports = {
    get,
    getById,
    addMessageToChat,
    addAdminMessageToChat,
    createChat,
    createRoom,
}