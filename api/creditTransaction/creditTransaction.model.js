const mongoose = require("mongoose");

const CreditTransactionSchema = new mongoose.Schema(
    {
        userInfo: { type: Object, required: true, default: null },
        type: { type: String, required: true, default: null },
        creditId: { type: String, required: true, default: null },
        creditName: { type: String, required: true, default: null },
        creditQuantity: { type: Number, required: true, default: null },
        packagePrice: { type: Number, required: true, default: null },
        createdAt: { type: Date, required: true, default: new Date() },
    },
);

module.exports = mongoose.model("CreditTransaction", CreditTransactionSchema, "credit_transaction");
