const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

async function sendEmail(message) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD
            }
        })

        const email = {
            ...message,
            from: process.env.MY_EMAIL,
        };

        await transporter.sendMail(email)
        console.log('Email sent successfully')
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

module.exports = {
    sendEmail,
}