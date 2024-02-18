const Credit = require('./credit.model')
const ObjectId = require('mongoose').ObjectId


async function query() {
    try {
        const credits = await Credit.find({})
        return credits
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
        return newCredit
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await Credit.deleteOne({ '_id': ObjectId(entityId) })
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