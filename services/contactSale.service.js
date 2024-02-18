const mongoose = require('mongoose')
const ContactSale = require('../models/ContactSale')

async function query(filterBy) {
    try {
        const sales = await ContactSale.find(filterBy)
        return sales
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const sale = await ContactSale.findOne({ '_id': mongoose.Types.ObjectId(userId) })
        return sale
    } catch (err) {
        throw err
    }
}

async function add(contactSale) {
    try {
        const newContactSale = await ContactSale(contactSale)
        const savedContactSale = await newContactSale.save()
        return savedContactSale
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await ContactSale.deleteOne({ '_id': mongoose.Types.ObjectId(entityId) })
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