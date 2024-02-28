import express from 'express';
import http from 'http';
const app = express();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import socketConnect from './services/socket.service.js';

app.use(cookieParser());

dotenv.config();
// const authRoute = require("./api/auth/auth.routes");
import authRoute from "./api/auth/auth.routes.js";

// const userRoute = require("./api/user/user.routes.js");
import userRoute from "./api/user/user.routes.js";

// const contactRoute = require("./api/contact/contact.routes.js");
import contactRoute from "./api/contact/contact.routes.js";

// const uploadRoute = require('./api/upload/upload.routes.js')
import uploadRoute from './api/upload/upload.routes.js';

// const categoryRoute = require("./api/category/category.routes.js")
import categoryRoute from "./api/category/category.routes.js";

// const jobTitleRoute = require("./api/jobTitle/jobTitle.routes.js")
import jobTitleRoute from "./api/jobTitle/jobTitle.routes.js";

// const companyRoute = require("./api/company/company.routes.js")
import companyRoute from "./api/company/company.routes.js";

// const territoryRoute = require("./api/territory/territory.routes.js")
import territoryRoute from "./api/territory/territory.routes.js";


// const stripeRoute = require("./api/payment/payment.routes.js");
import stripeRoute from "./api/payment/payment.routes.js";


// const creditTransactionRoute = require("./api/creditTransaction/creditTransaction.routes.js")
import creditTransactionRoute from "./api/creditTransaction/creditTransaction.routes.js";


// const contactTransactionRoute = require("./api/contactTransaction/contactTransaction.routes.js")
import contactTransactionRoute from "./api/contactTransaction/contactTransaction.routes.js";


// const creditRoute = require("./api/credit/credit.routes.js")


// const contactRequestRoute = require("./api/contactRequest/contactRequest.routes.js")
import contactRequestRoute from "./api/contactRequest/contactRequest.routes.js";


// const userWaitlist = require("./api/userWaitlist/userWaitlist.routes.js")
import userWaitlist from "./api/userWaitlist/userWaitlist.routes.js";


// const country = require("./api/country/country.routes.js")
import country from "./api/country/country.routes.js";


// const agentMessage = require("./api/agentMessage/agentMessage.routes.js")
import agentMessage from "./api/agentMessage/agentMessage.routes.js";



// const feedbackRoute = require("./api/feedback/feedback.routes.js")
import feedbackRoute from "./api/feedback/feedback.routes.js";


// const supportChatRoute = require("./api/supportChat/supportChat.routes.js")
import supportChatRoute from "./api/supportChat/supportChat.routes.js";

// const cors = require("cors");
import cors from "cors";
// const path = require("path");
import path from "path";
// const { errorMiddleware } = require("./middlewares/globalError.middleware");
import errorMiddleware from "./middlewares/globalError.middleware.js";

const corsOptions = {
    origin: [
        // LOCALS:
        'http://127.0.0.1:5173',
        'http://localhost:80',

        // REMOTES:
        'http://165.227.166.214:8000',
        'https://qleads.mobi',
        'https://qleads.mobi:80',
    ],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/contacts", contactRoute);
app.use('/api/file', uploadRoute)
app.use("/api/categories", categoryRoute);
app.use("/api/jobTitle", jobTitleRoute)
app.use("/api/company", companyRoute)
app.use("/api/territory", territoryRoute)
app.use("/api/credit", creditRoute)
app.use("/api/credit/transaction", creditTransactionRoute)
app.use("/api/contact/transaction", contactTransactionRoute)
app.use("/api/contact/request", contactRequestRoute)
app.use("/api/payment", stripeRoute);
app.use("/api/user_waitlist", userWaitlist);
app.use("/api/country", country);
app.use("/api/agentMessage", agentMessage);
app.use("/api/feedback", feedbackRoute);
app.use("/api/support_chat", supportChatRoute);
app.use(express.static('public'));

app.use(errorMiddleware)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 80
let sslServer = http.createServer(app)
socketConnect(sslServer)

sslServer.listen(port, () => {
    console.log('Listening on port ' + port)
    require('./services/db.service')
})

