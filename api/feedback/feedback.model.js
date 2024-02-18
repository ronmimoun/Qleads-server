const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    img: { type: Object, required: true }
})

const FeedbackSchema = new mongoose.Schema(
    {
        contact: { type: ContactSchema, required: true },
        userId: { type: String, required: true },
        rating: { type: Number, default: 0 },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: new Date() },
    },
);

module.exports = mongoose.model("Feedback", FeedbackSchema, "feedback");
