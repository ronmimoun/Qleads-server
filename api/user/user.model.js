const mongoose = require("mongoose");
const waitlistStatus = require("../../constants/waitlistStatus");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        email: { type: String, unique: true },
        password: { type: String },
        isAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: new Date() },
        updatedAt: { type: Date, default: null },
        imgUrl: { type: { url: String, _id: String }, default: null },
        phone: { type: String, default: null },
        address: { type: String, default: null },
        fullname: { type: String, default: null },
        isActive: { type: Boolean, default: true },
        gender: { type: String, default: null },
        permissions: { type: Array, default: [] },
        favorites: { type: Array, default: [] },
        credits: { type: Number, default: 0 },
        creditTransactions: { type: Array, default: [] },
        contactTransactions: { type: Array, default: [] },
        contactUploads: { type: Array, default: [] },
        searchHistory: { type: Array, default: [] },
        notifications: { type: Array, default: [] },
        income: { type: Number, default: 0 },
        verified: { type: Boolean, default: false },
        approveStatus: { type: String, default: waitlistStatus.PENDING },
        countryPreferences: { type: Array, default: [] },
        agentMessages: { type: Array, default: [] }
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    }
);

const User = mongoose.model("User", UserSchema, "user");
module.exports = User;