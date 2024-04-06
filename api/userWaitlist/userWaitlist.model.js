// const mongoose = require("mongoose");
// const waitlistStatus = require("../../constants/waitlistStatus")
import mongoose from 'mongoose';
import waitlistStatus from '../../constants/waitlistStatus.js';

const UserWaitlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
            unique: true,
        },
        username: { type: String, required: false, default: null },
        fullname: { type: String, default: null },
        email: { type: String, default: null },
        registeredAt: { type: Date, default: new Date() },
        approveStatus: { type: String, default: waitlistStatus.PENDING },
    },
);

const UserWaitlistModel = mongoose.model("UserWaitlist", UserWaitlistSchema, 'user_waitlist');

export default {
    UserWaitlistModel
}

// module.exports = mongoose.model("UserWaitlist", UserWaitlistSchema, 'user_waitlist');
