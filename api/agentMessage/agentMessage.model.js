const mongoose = require("mongoose");

const AgentMessageSchema = new mongoose.Schema(
    {
        userId: { type: String, default: null, required: true },
        agentId: { type: String, default: null, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: new Date() },
        readAt: { type: Date, default: null },
        message: { type: String, default: null, required: true },
        userCompany: { type: String, default: null, required: true },
        userJobTitle: { type: String, default: null, required: true },
        userCategory: { type: String, default: null, required: true },
        username: { type: String, default: null, required: true },
        contact: {
            type: {
                _id: { type: String, required: true },
                img: { type: Object, default: null },
                category: { type: String },
                company: { type: String },
                jobTitle: { type: String },
                price: { type: Number },
            },
            default: null
        }
    },
);

module.exports = mongoose.model("AgentMessage", AgentMessageSchema, "agent_message");
