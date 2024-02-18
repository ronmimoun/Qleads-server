const mongoose = require("mongoose");

const ContactTransactionSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, default: null },
        contact: { type: Object, required: true, default: null },
        priceInCredit: { type: Number, required: true, default: null },
        createdAt: { type: Date, required: true, default: new Date() },
        userId: { type: String, required: true, default: null },
    },
);

module.exports = mongoose.model("ContactTransaction", ContactTransactionSchema, "contact_transaction");
