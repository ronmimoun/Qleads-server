// const UserWaitlist = require('./userWaitlist.model')
// const User = require('../user/user.model')
// const mongoose = require('mongoose')
// const WaitlistStatus = require('../../constants/waitlistStatus')

import UserWaitlistModel from './userWaitlist.model.js'
import User from '../user/user.model.js'
import mongoose from 'mongoose'
import WaitlistStatus from '../../constants/waitlistStatus.js';

async function get() {
    try {
        const users = await UserWaitlistModel.find({})
        return users
    } catch (err) {
        throw err
    }
}

async function update(user, status) {
    try {
        const userToApprove = {
            ...user,
            _id: mongoose.Types.ObjectId(user._id),
            approveStatus: status
        }
        await User.findByIdAndUpdate(mongoose.Types.ObjectId(user.userId), { $set: { approveStatus: status } })
        const res = await UserWaitlistModel.findByIdAndUpdate(mongoose.Types.ObjectId(user._id), { ...userToApprove }, { new: true })
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
            userId: mongoose.Types.ObjectId(user._id),
        }
        const saveUserRequest = await UserWaitlistModel.create(userRequestToSave);
        return saveUserRequest
    } catch (err) {
        throw err
    }
}

async function remove(user) {
    try {
        await UserWaitlistModel.deleteOne({ _id: user._id })
        await User.findByIdAndUpdate(mongoose.Types.ObjectId(user.userId), { $set: { approveStatus: WaitlistStatus.REJECTED } })
    } catch (err) {
        throw err
    }
}

export default {
    get,
    update,
    add,
    remove,
}