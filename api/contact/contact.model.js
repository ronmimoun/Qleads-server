const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        company: { type: String, required: true },
        desc: { type: String, required: true },
        country: { type: String, required: false, default: null },
        category: { type: String, required: false, default: null },
        jobTitle: { type: String, required: false, default: null },
        price: { type: Number, required: false, default: 20 },
        inStock: { type: Boolean, required: false, default: false },
        name: { type: String, required: false, default: null },
        familyName: { type: String, required: false, default: null },
        emails: { type: Array, required: false, default: [] },
        mobile: { type: String, required: false, default: null },
        phone: { type: String, required: false, default: null },
        linkedinLink: { type: String, required: false, default: null },
        agent: { type: Object, required: false, default: null },
        img: { type: Object, required: false, default: {} },
        createdAt: { type: Date, required: true, default: new Date() },
        transactionHistory: { type: Array, required: false, default: [] },
        averageRating: { type: Number, default: 0 },
        numberOfRatings: { type: Number, default: 0 },
    },
);

const ChannelModel = mongoose.model("Contact", ContactSchema, "contact");
module.exports = ChannelModel
