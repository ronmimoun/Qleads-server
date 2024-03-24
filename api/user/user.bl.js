const mongoose = require("mongoose")
const User = require("./user.model")
const Token = require("../../models/Token")
const userService = require('./user.service');
const waitlistStatus = require('../../constants/waitlistStatus');
const userWaitlistService = require('../userWaitlist/userWaitlist.service');


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
        await userWaitlistService.update(userId, waitlistStatus.APPROVED)
        return updatedUser;
    }

}

module.exports = UserBL
