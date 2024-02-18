const Territory = require('./territory.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const territories = await Territory.find({})
        // const collection = await dbService.getCollection('territory')
        // let entities = await collection.find({}).toArray()
        return territories
    } catch (err) {
        throw err
    }
}

async function update(entity) {
    try {
        const entityToSave = {
            ...entity,
            _id: ObjectId(entity._id),
        }

        const updatedTerritory = await Territory.findByIdAndUpdate(
            entityToSave._id,
            { $set: entityToSave },
            { new: true } // Return the updated document
        );

        // const collection = await dbService.getCollection('territory')
        // await collection.updateOne({ '_id': entityToSave._id }, { $set: entityToSave })
        return updatedTerritory
    } catch (err) {
        throw err
    }
}

async function add(entity) {
    try {
        const entityToSave = {
            territoryName: entity.title
        }
        const savedEntity = new Territory(entityToSave)
        const newTerritory = await savedEntity.save()

        // const collection = await dbService.getCollection('territory')
        // await collection.insertOne(savedEntity)
        return newTerritory
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await Territory.deleteOne({ '_id': ObjectId(entityId) })
        // const collection = await dbService.getCollection('territory')
        // await collection.deleteOne({ '_id': ObjectId(entityId) })
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