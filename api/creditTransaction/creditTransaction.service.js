// const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const CreditTransaction = require('./creditTransaction.model')

// const COLLECTION_KEY = 'credit_transaction'

async function query() {
    try {
        const sales = await CreditTransaction.find({})
        return sales
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // const entities = await collection.find({}).toArray()
        // return entities
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

        const updatedSale = await CreditTransaction.findByIdAndUpdate(
            updatedEntity._id,
            { $set: updatedEntity },
            { new: true } // Return the updated document
        );

        return updatedSale

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.updateOne({ '_id': updatedEntity._id }, { $set: updatedEntity })
    } catch (err) {
        throw err
    }
}

async function add(credits) {
    try {
        // collection = await dbService.getCollection(COLLECTION_KEY)
        const savedCreditTransaction = await CreditTransaction.insertMany(credits)
        return savedCreditTransaction

        // await Promise.all(
        //     // credits.map(credit => collection.insertOne(credit))
        //     credits.map(credit => {
        //         const newJobTitle = new JobTitle(jobTitleToSave)
        //         const savedJobTitle = await newJobTitle.save()
        //     })
        // )
        // return credits
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await CreditTransaction.deleteOne({ '_id': ObjectId(entityId) })

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.deleteOne({ '_id': ObjectId(entityId) })
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