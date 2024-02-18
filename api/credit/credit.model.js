const mongoose = require("mongoose");

const CreditSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, default: 'Regular' },
        description: { type: String, required: false, default: null },
        price: { type: Number, required: true, default: 10 },
        quantity: { type: Number, required: true, default: 100 }
    },
);

const ChannelModel = mongoose.model("Credit", CreditSchema, "credit");
module.exports = ChannelModel
