// const mongoose = require("mongoose");
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, default: null },
        createdAt: { type: Date, required: true, default: new Date() },
        message: { type: String, required: true, default: null },
        isRead: { type: Boolean, required: true, default: false },
    },
);

const Notification = mongoose.model("Notification", NotificationSchema, "notification");
export default Notification