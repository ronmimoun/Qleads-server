const mongoose = require("mongoose");

const JobTitleSchema = new mongoose.Schema(
    {
        img: { type: String, required: false, default: null },
        title: { type: String, default: null },
        value: { type: String, default: null },
    },
);

module.exports = mongoose.model("JobTitle", JobTitleSchema, "jobTitle");
