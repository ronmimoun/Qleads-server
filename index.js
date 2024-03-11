const express = require("express");
const http = require('http')
const app = express();
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const socketService = require("./services/socket.service")
app.use(cookieParser());

dotenv.config();
const authRoute = require("./api/auth/auth.routes");
const userRoute = require("./api/user/user.routes");
const contactRoute = require("./api/contact/contact.routes");
const uploadRoute = require('./api/upload/upload.routes')
const categoryRoute = require("./api/category/category.routes")
const jobTitleRoute = require("./api/jobTitle/jobTitle.routes")
const companyRoute = require("./api/company/company.routes")
const territoryRoute = require("./api/territory/territory.routes")
const stripeRoute = require("./api/payment/payment.routes");
const creditTransactionRoute = require("./api/creditTransaction/creditTransaction.routes")
const contactTransactionRoute = require("./api/contactTransaction/contactTransaction.routes")
const creditRoute = require("./api/credit/credit.routes")
const contactRequestRoute = require("./api/contactRequest/contactRequest.routes")
const userWaitlist = require("./api/userWaitlist/userWaitlist.routes")
const country = require("./api/country/country.routes")
const agentMessage = require("./api/agentMessage/agentMessage.routes")
const feedbackRoute = require("./api/feedback/feedback.routes")
const supportChatRoute = require("./api/supportChat/supportChat.routes")
const { CORS } = require('./constants/cors.constant')

const cors = require("cors");
const path = require("path");
const { errorMiddleware } = require("./middlewares/globalError.middleware");

const corsOptions = {
    origin: CORS,
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


const port = process.env.MOBILE_PORT
let sslServer = http.createServer(app)
socketService.socketConnect(sslServer)

sslServer.listen(port, () => {
    console.log('Listening on port ' + port)
    require('./services/db.service')
    require('./utils/socket.util')
})

