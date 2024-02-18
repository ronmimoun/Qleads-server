const Credit = require('./credit.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_KEY = 'credit'

async function query() {
    try {
        const credits = await Credit.find({})
        return credits
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

        const updatedCredit = await Credit.findByIdAndUpdate(
            updatedEntity._id,
            { $set: updatedEntity },
            { new: true } // Return the updated document
        );

        return updatedCredit

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.updateOne({ '_id': updatedEntity._id }, { $set: updatedEntity })
    } catch (err) {
        throw err
    }
}

async function add(entity) {
    try {
        const entityToSave = {
            entity: entity.title,
            category: entity.category
        }
        const savedEntity = new Credit(entityToSave)
        const newCredit = await savedEntity.save()

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.insertOne(savedEntity)
        return newCredit
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await Credit.deleteOne({ '_id': ObjectId(entityId) })

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