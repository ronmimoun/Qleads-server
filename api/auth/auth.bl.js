const { TOKENS_URL } = require('../../constants/token.constants');
const tokenService = require('../../services/token.service');
const emailService = require('../../services/email.service');
const userService = require('../user/user.service');
const userWaitlistService = require('../userWaitlist/userWaitlist.service');
const { compareDates } = require('../../utils/date.utils');

class AuthBL {
    static async checkAndUpdateUserFieldReset(user) {
        const updatedUser = await this._checkAndUpdateUserDisclosure(user);
        return updatedUser;
    }

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

    static async _checkAndUpdateUserDisclosure(user) {
        if (user.contactDisclosure.revealCount) return user

        const revealCountDate = user?.contactDisclosure?.nextRevealCountReset

        if (!user?.contactDisclosure || !revealCountDate) return user;

        const todayDate = new Date();
        const datesCompareResult = compareDates(todayDate, revealCountDate)

        if (datesCompareResult < 0) return user;

        const updatedUser = await userService.resetUserContactDisclosureRevealCount(user._id)
        return updatedUser
    }
}

module.exports = AuthBL
