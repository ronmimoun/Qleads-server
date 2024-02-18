const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    senderId: { type: String, required: true, },
    senderName: { type: String, required: true, },
    receiverId: { type: String, default: null },
    content: { type: String, required: true, },
    createdAt: { type: Date, default: new Date(), },
    isRead: { type: Boolean, default: false, },
    isUserSender: { type: Boolean, default: false, },
});


const SupportChatSchema = new mongoose.Schema(
    {
        chatId: { type: String, required: true, unique: true },
        fullname: { type: String, required: true },
        chatImg: { type: String, default: null },
        username: { type: String, required: true },
        messages: [MessageSchema]
    },
);

module.exports = mongoose.model("SupportChat", SupportChatSchema, "support_chat");
