const mongoose = require("mongoose");

const ContactRequestSchema = new mongoose.Schema(
    {
        contactInfo: { type: Object, required: true },
        isApproved: { type: Boolean, required: true, default: false },
        status: { type: String, required: true, default: 'pending' },
        createdAt: { type: Date, required: true, default: new Date() },
        updatedAt: { type: Date, required: false, default: null },
        agent: { type: Object, required: true }
    },
);

module.exports = mongoose.model("ContactRequest", ContactRequestSchema, "contact_request");
