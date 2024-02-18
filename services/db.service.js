const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = process.env.NODE_ENV !== "production" ? process.env.MONGO_URL : 'mongodb://localhost:27017/qleads'

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to DB");
})