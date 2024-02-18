const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const ContactSale = require('../models/ContactSale')

const COLLECTION_KEY = 'contact_sale'

async function query(filterBy) {
    try {
        const sales = await ContactSale.find(filterBy)
        return sales
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // const entities = await collection.find(filterBy).toArray()
        // return entities
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const sale = await ContactSale.findOne({ '_id': ObjectId(userId) })
        return sale
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // const user = await collection.findOne({ '_id': ObjectId(userId) })
        // delete user.password
        // return user
    } catch (err) {
        throw err
    }
}

async function add(contactSale) {
    try {
        const newContactSale = await ContactSale(contactSale)
        const savedContactSale = await newContactSale.save()
        return savedContactSale
        // collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.insertOne(transaction)
        // return transaction
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await ContactSale.deleteOne({ '_id': ObjectId(entityId) })
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.deleteOne({ '_id': ObjectId(entityId) })
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    add,
    remove,
    getById,
}