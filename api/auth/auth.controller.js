const User = require("../user/user.model");
const bcrypt = require('bcrypt')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

const userService = require('../user/user.service');
const authService = require('./auth.service')
const waitlistStatus = require("../../constants/waitlistStatus")
const SimpleJWT = require("../../services/jwt.service")
const AuthBL = require("./auth.bl");


// REGISTER
async function register(req, res, next) {
    try {
        const userCredentials = req.body
        if (!userCredentials.username || !userCredentials.password || !userCredentials.email) return res.status(409).send({ status: 'error', message: 'fullname, username and password are required!' })

        const userInDB = await User.findOne({ email: userCredentials.email });
        if (userInDB) return res.status(409).send({ status: 'error', message: 'User with given email already exist!' })

        const savedUser = await AuthBL.registerUser(userCredentials)
        await AuthBL.sendTokenToRegisteredUser(savedUser)

        const loginToken = getLoginToken(savedUser)
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        res.status(201).json({ status: 'ok' });
    } catch (err) {
        next(err)
    }
}

//LOGIN
async function login(req, res, next) {
    try {
        const { username, password } = req.body
        const user = await authService.login(username)

        if (!user) return res.status(401).json({ message: "User not found", status: 'error' })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ message: "Wrong credentials!", status: 'error' })
        else if (!user.verified) {
            await AuthBL.sendEmailVerification(user)
            return res.status(401).json({ message: 'Please verify your account first!', status: 'error' })
        }
        else if (user.approveStatus !== waitlistStatus.APPROVED) {
            return res.status(401).json({ message: 'Please wait for account approval', status: 'error' })
        }

        const updatedUser = await AuthBL.checkAndUpdateUserFieldReset(user)

        delete updatedUser.password
        const jwtInstance = new SimpleJWT()
        const jwtToken = jwtInstance.encode({ userId: updatedUser._id })

        res.status(200).json({ status: 'ok', content: { user: updatedUser, jwtToken } });
    } catch (err) {
        next(err)
    }
}

// LOGOUT
async function logout(req, res) {
    try {
        res.status(200).json({ status: 'ok', message: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Failed to logout' })
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
    getLoginToken,
    recoveryEmail,
    isValidOTP
}