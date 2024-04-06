// const mongoose = require("mongoose");
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const TokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
            unique: true,
        },
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now(), expires: 3600 }
    },
);

const Token = mongoose.model("Token", TokenSchema, "token");
export default Token