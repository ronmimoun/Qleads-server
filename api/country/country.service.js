const Country = require('./country.model')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const countries = await Country.find({});
        return countries
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

        const updatedCountry = await Country.findByIdAndUpdate(
            updatedEntity._id,
            { $set: updatedEntity },
            { new: true }
        );

        return updatedCountry
    } catch (err) {
        throw err
    }
}

async function add(country) {
    try {
        const entityToSave = {
            name: country.name,
            code: country.code
        }
        const savedEntity = new Country(entityToSave)
        const savedCountry = await savedEntity.save()
        return savedCountry
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await Country.deleteOne({ '_id': ObjectId(entityId) })
        return entityId
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