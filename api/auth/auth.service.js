// const Cryptr = require('cryptr')
import Cryptr from 'cryptr'

import nodemailer from 'nodemailer'

// const { getOTPEmail } = require('../../constants/email')
import { getOTPEmail } from '../../constants/email.js';


// const bcrypt = require('bcrypt')
import bcrypt from 'bcrypt'


// const User = require('../user/user.model')
import User from '../user/user.model.js'


// const utilService = require('../../services/util.service')
import utilService from '../../services/util.service.js'


const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

function validateToken(res) {
    try {
        const json = cryptr.decrypt(res.cookies.loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

async function login(username) {
    try {
        const user = await User.findOne({ username })
        return user
    } catch (err) {
        throw err
    }
}

async function sendEmail({ email }) {
    try {
        const OTP = utilService.generateRandomNumber(4)
        global.otp = OTP

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const message = {
            from: '"Password Recover" <matandamary10@gmail.com>',
            to: email,
            subject: 'Hello ✔',
            text: 'Hello world?',
            html: getOTPEmail(OTP),
        };

        await transporter.sendMail(message);
    } catch (err) {
        throw err
    }
}

function isOTPValid({ OTP }) {
    const userOTP = OTP.join('')
    const CODE = global.otp
    delete global.opt
    return userOTP === CODE
}

async function encodeUserPassword(password) {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
}

export default {
    validateToken,
    login,
    sendEmail,
    isOTPValid,
    encodeUserPassword,
}