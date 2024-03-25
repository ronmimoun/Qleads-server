const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = process.env.NODE_ENV === "production" ? process.env.MONGO_URL_PRODUCTION : process.env.MONGO_URL

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to DB");
})