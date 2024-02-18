const dbService = require('../../services/db.service')
const userService = require('../user/user.service')
const ObjectId = require('mongodb').ObjectId
const ContactTransaction = require('./contactTransaction.model')

const COLLECTION_KEY = 'contact_transaction'

async function get(filterBy) {
    try {
        const contactTransactions = await ContactTransaction.find(filterBy)
        return contactTransactions
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // const entities = await collection.find(filterBy).toArray()
        // return entities
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const user = await ContactTransaction.findOne({ '_id': ObjectId(userId) })
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // const user = await collection.findOne({ '_id': ObjectId(userId) })
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

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.updateOne({ '_id': updatedEntity._id }, { $set: updatedEntity })
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

        // collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.insertOne(transaction)
        // return transaction
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