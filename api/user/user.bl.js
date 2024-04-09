const mongoose = require("mongoose")
const User = require("./user.model")
const Token = require("../../models/Token")
const userService = require('./user.service');
const waitlistStatus = require('../../constants/waitlistStatus');
const { getNextMonth } = require("../../utils/date.utils");


class UserBL {

    static async getUserById(userId) {
        const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) })
        if (!user) throw new Error({ status: 'error', message: 'User not found' })
        return user
    }

    static async getUserToken(userId, tokenNumber) {
        const userToken = await Token.findOne({ userId, token: tokenNumber })
        if (!userToken) throw new Error({ status: 'error', message: 'Invalid link' })
        return userToken
    }

    static async approveUserToken(userId) {
        const updatedUser = userService.update({ _id: userId, verified: true, approveStatus: waitlistStatus.APPROVED })
        return updatedUser;
    }

    static async updateUserContactDisclosure(userId, contactDisclosure) {
        const { revealCount, contactRevealed } = contactDisclosure;
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    ['contactDisclosure.contactsRevealed']: contactRevealed
                },
                $set: { ['contactDisclosure.revealCount']: revealCount }
            },
            { new: true }
        )
        return updatedUser
    }

    static async updateNextRevealCountReset(userId) {
        const nextMonth = getNextMonth();
        await User.findOneAndUpdate(
            {
                _id: userId, $or: [
                    { 'contactDisclosure.nextRevealCountReset': { $exists: false } },
                    { 'contactDisclosure.nextRevealCountReset': null }
                ]
            },
            {
                $set: { ['contactDisclosure.nextRevealCountReset']: nextMonth }
            },

        )
    }
}

module.exports = UserBL
