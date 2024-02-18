const mongoose = require("mongoose");

const ContactSaleSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, default: null },
        contact: { type: Object, required: true, default: null },
        priceInCredit: { type: Number, required: true, default: null },
        createdAt: { type: Date, required: true, default: new Date() },
        sellerUserId: { type: String, required: true, default: null },
        buyingUserId: { type: String, required: true, default: null },
    },
);

module.exports = mongoose.model("ContactSale", ContactSaleSchema, "contact_sale");
