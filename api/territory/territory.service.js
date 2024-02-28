const Territory = require('./territory.model')
const mongoose = require('mongoose')

async function get() {
    try {
        const territories = await Territory.find({})
        return territories
    } catch (err) {
        throw err
    }
}

async function update(entity) {
    try {
        const entityToSave = {
            ...entity,
            _id: mongoose.Types.ObjectId(entity._id),
        }

        const updatedTerritory = await Territory.findByIdAndUpdate(
            entityToSave._id,
            { $set: entityToSave },
            { new: true } // Return the updated document
        );
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
        return newTerritory
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await Territory.deleteOne({ '_id': mongoose.Types.ObjectId(entityId) })
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