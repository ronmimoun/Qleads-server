const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, default: null },
        createdAt: { type: Date, required: true, default: new Date() },
        message: { type: String, required: true, default: null },
        isRead: { type: Boolean, required: true, default: false },
    },
);

module.exports = mongoose.model("Notification", NotificationSchema, "notification");
