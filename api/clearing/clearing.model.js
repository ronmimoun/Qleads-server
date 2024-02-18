const mongoose = require("mongoose");

const ClearingSchema = new mongoose.Schema(
    {
        purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true },
        clearingDate: { type: Date, required: true, default: new Date() },
        clearingStatus: { type: String, enum: ['cleared', 'pending', 'failed'], default: 'pending', },
        // clearingDetails: {
        //   transactionId: String,
        //   clearingMessage: String,
        // },
    },
);

module.exports = mongoose.model("Clearing", ClearingSchema, "clearing");