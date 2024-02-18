const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, default: null },
        code: { type: String, required: true, default: null },
    },
);

const ChannelModel = mongoose.model("Country", CountrySchema, "country");
module.exports = ChannelModel
