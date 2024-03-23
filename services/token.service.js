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


module.exports = {
    createUserToken
}