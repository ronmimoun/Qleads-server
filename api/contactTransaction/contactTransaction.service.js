const userService = require('../user/user.service')
const ObjectId = require('mongoose').ObjectId
const ContactTransaction = require('./contactTransaction.model')

async function get(filterBy) {
    try {
        const contactTransactions = await ContactTransaction.find(filterBy)
        return contactTransactions
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const user = await ContactTransaction.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        throw err
    }
}

async function update(entity) {
    try {
        const updatedEntity = {
            ...entity,
            _id: ObjectId(entity._id),
        }

        const updatedContactTransaction = await ContactTransaction.findByIdAndUpdate(
            updatedEntity._id,
            { $set: updatedEntity },
            { new: true } // Return the updated document
        );

        return updatedContactTransaction
    } catch (err) {
        throw err
    }
}

async function add(transaction) {
    try {
        const newTransaction = new ContactTransaction(transaction)
        const savedTransaction = await newTransaction.save()
        return savedTransaction
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await ContactTransaction.deleteOne({ '_id': ObjectId(entityId) })
        return entityId
    } catch (err) {
        throw err
    }
}

async function getUsersTransactionByContactId(usersId) {
    try {
        const usersMap = new Map()
        usersId.forEach(userId => usersMap.set(userId, { fullname: null, counter: 0 }))

        const users = await Promise.all(
            usersId.map(async userId => {
                res = await userService.getById(userId)
                logg
                usersMap.set(userId, { fullname: res?.fullname || res.username, counter: ++usersMap.get(userId).counter })
                return usersMap
            })
        )
        return usersMap
    } catch (err) {
        throw err
    }
}

module.exports = {
    get,
    update,
    add,
    remove,
    getById,
    getUsersTransactionByContactId,
}