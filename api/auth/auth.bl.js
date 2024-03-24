const { TOKENS_URL } = require('../../constants/token.constants');
const tokenService = require('../../services/token.service');
const emailService = require('../../services/email.service');
const userService = require('../user/user.service');
const userWaitlistService = require('../userWaitlist/userWaitlist.service');

class AuthBL {

    static async registerUser(userCredentials) {
        try {
            const savedUser = await userService.create(userCredentials)
            await userWaitlistService.add(savedUser)
            return savedUser
        } catch (err) {
            throw err
        }
    }

    static async sendTokenToRegisteredUser(user) {
        try {
            const savedToken = await tokenService.createUserToken(user)
            const url = `${TOKENS_URL.REGISTERED_USER}${user._id}/verify/${savedToken.token}`
            await emailService.sendEmail({ to: user.email, subject: "Verify Email", text: url })
        } catch (err) {
            throw err
        }
    }

    static async sendEmailVerification(user) {
        const token = await tokenService.getTokenByUserId(user._id)
        const url = `${TOKENS_URL.REGISTERED_USER}${user._id}/verify/${token.token}`
        await emailService.sendEmail({ to: user.email, subject: "Verify Email", text: url })
    }
}

module.exports = AuthBL
