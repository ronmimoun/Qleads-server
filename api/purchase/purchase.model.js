const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
    {
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        items: [
            {
                type: { type: String, enum: ['contact', 'credit'] },
                item: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.type' },
                seller: { type: String },
                price: { type: Number, required: true }
            },
        ],
        purchaseDate: { type: Date, required: true, default: new Date() },
        paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending', },
        purchasePrice: { type: String, required: true }
    },
);

module.exports = mongoose.model("Purchase", PurchaseSchema, "purchase");