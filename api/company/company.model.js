const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        img: { type: String, required: false, default: null },
        category: { type: String, default: null },
        company: { type: String, default: null },
    },
);

module.exports = mongoose.model("Company", CompanySchema, "company");
