const User = require("../user/user.model");
const bcrypt = require('bcrypt')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

const userService = require('../user/user.service');
const authService = require('./auth.service')
const userWaitlistService = require('../userWaitlist/userWaitlist.service')
const waitlistStatus = require("../../constants/waitlistStatus")


// REGISTER
async function register(req, res) {
    try {
        const user = req.body
        if (!user.username || !user.password || !user.email) return Promise.reject('fullname, username and password are required!')

        const userInDB = await User.findOne({ email: user.email });
        if (userInDB) return res.status(409).send({ status: 'error', message: 'User with given email already exist!' })

        let userToAdd = await userService.create(user)

        await userWaitlistService.add(userToAdd)

        const loginToken = getLoginToken(userToAdd)
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        res.status(201).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//LOGIN
async function login(req, res) {
    const { username, password } = req.body
    try {

        const user = await authService.login(username)
        if (!user) return res.status(401).json({ message: "User not found", status: 'error' })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ message: "Wrong credentials!", status: 'error' })
        else if (!user.verified) {
            await userService.sendEmailVerification(user)
            return res.status(401).json({ message: 'Please verify your account first!', status: 'error' })
        }
        else if (user.approveStatus !== waitlistStatus.APPROVED) {
            return res.status(401).json({ message: 'Please wait for account approval', status: 'error' })
        }

        const loginToken = getLoginToken(user)
        delete user.password
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        res.status(200).json({ status: 'ok', content: user });
    } catch (err) {
        res.status(500).json(err);
    }
}

// LOGOUT
async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ status: 'ok', message: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Failed to logout' })
    }
}

async function isAdmin(req, res) {
    try {
        res.send({ status: 'ok' })
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Failed to verify' })
    }
}

async function recoveryEmail(req, res) {
    try {
        await authService.sendEmail(req.body)
        res.send({ status: 'ok' })
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Failed to send email' })
    }
}

async function isValidOTP(req, res) {
    try {
        const result = authService.isOTPValid(req.body)
        res.status(200).send({ status: 'ok', content: result })
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Failed to check OTP' })
    }
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify({ _id: user._id, isAdmin: user.isAdmin }))
}


module.exports = {
    register,
    login,
    logout,
    isAdmin,
    getLoginToken,
    recoveryEmail,
    isValidOTP
}