const mongoose = require("mongoose");

const TerritorySchema = new mongoose.Schema(
    {
        territoryName: { type: String, default: null },
    },
);

module.exports = mongoose.model("Territory", TerritorySchema, "territory");
