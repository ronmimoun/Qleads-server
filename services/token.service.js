const mongoose = require('mongoose');
const Token = require('../models/Token');
const utilService = require('./util.service');

async function createUserToken(savedUser) {
    try {
        const savedToken = await new Token({
            userId: savedUser._id,
            token: utilService.generateRandomNumber(10)
        }).save()

        return savedToken
    } catch (err) {
        throw err
    }
}

async function getTokenByUserId(userId) {
    try {
        const token = await Token.findOne({ '_id': mongoose.Types.ObjectId(userId) })
        return token
    } catch (error) {
        throw error
    }
}


module.exports = {
    createUserToken,
    getTokenByUserId
}