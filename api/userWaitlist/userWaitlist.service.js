const UserWaitlist = require('./userWaitlist.model')
const User = require('../user/user.model')
const ObjectId = require('mongodb').ObjectId
const WaitlistStatus = require('../../constants/waitlistStatus')

async function get() {
    try {
        const users = await UserWaitlist.find({})
        return users
    } catch (err) {
        throw err
    }
}

async function update(user, status) {
    try {
        const userToApprove = {
            ...user,
            _id: ObjectId(user._id),
            approveStatus: status
        }
        await User.findByIdAndUpdate(ObjectId(user.userId), { $set: { approveStatus: status } })
        const res = await UserWaitlist.findByIdAndUpdate(ObjectId(user._id), { ...userToApprove }, { new: true })
        return res
    } catch (err) {
        throw err
    }
}

async function add(user) {
    try {
        const userRequestToSave = {
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            userId: ObjectId(user._id),
        }
        const saveUserRequest = await UserWaitlist.create(userRequestToSave);
        return saveUserRequest
    } catch (err) {
        throw err
    }
}

async function remove(user) {
    try {
        await UserWaitlist.deleteOne({ _id: user._id })
        await User.findByIdAndUpdate(ObjectId(user.userId), { $set: { approveStatus: WaitlistStatus.REJECTED } })
    } catch (err) {
        throw err
    }
}


module.exports = {
    get,
    update,
    add,
    remove,
}