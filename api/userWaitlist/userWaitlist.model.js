const mongoose = require("mongoose");
const waitlistStatus = require("../../constants/waitlistStatus")

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
        // isApproved: { type: Boolean, default: false },
    },
);

module.exports = mongoose.model("UserWaitlist", UserWaitlistSchema, 'user_waitlist');
