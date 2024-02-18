const mongoose = require('mongoose')
const CreditTransaction = require('./creditTransaction.model')


async function query() {
    try {
        const sales = await CreditTransaction.find({})
        return sales
    } catch (err) {
        throw err
    }
}

async function update(entity) {
    try {
        const updatedEntity = {
            ...entity,
            _id: mongoose.Types.ObjectId(entity._id),
        }

        const updatedSale = await CreditTransaction.findByIdAndUpdate(
            updatedEntity._id,
            { $set: updatedEntity },
            { new: true } // Return the updated document
        );

        return updatedSale
    } catch (err) {
        throw err
    }
}

async function add(credits) {
    try {
        const savedCreditTransaction = await CreditTransaction.insertMany(credits)
        return savedCreditTransaction
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await CreditTransaction.deleteOne({ '_id': mongoose.Types.ObjectId(entityId) })
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    update,
    add,
    remove,
}