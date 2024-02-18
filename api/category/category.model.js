const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        img: { type: String, required: false, default: null },
        title: { type: String, default: null },
        cat: { type: String, default: null },
    },
);

module.exports = mongoose.model("Category", CategorySchema, "category");
