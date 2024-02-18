// Constants
const requestStatus = require('../../constants/requestStatus')

// Model
const ObjectId = require('mongodb').ObjectId
const ContactRequest = require("./contactRequest.model");

// Services
const dbService = require('../../services/db.service')
const userService = require('../user/user.service')
const contactService = require('../contact/contact.service')


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const agentContactsRequest = await ContactRequest.find(criteria)
        return agentContactsRequest
    } catch (err) {
        throw err
    }
}

async function add(entity) {
    try {
        const entityToSave = {
            ...entity,
        }

        const newEntity = new ContactRequest(entityToSave)
        const savedEntity = await newEntity.save()

        return savedEntity
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await ContactRequest.deleteOne({ '_id': ObjectId(entityId) })
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.deleteOne({ '_id': ObjectId(entityId) })
    } catch (err) {
        throw err
    }
}

async function update(entity) {
    try {
        // peek only updatable fields!
        const entityToSave = {
            ...entity,
            _id: ObjectId(entity._id),
            isApproved: _approveContact(entity),
            status: _approveContact(entity) ? 'ok' : 'rejected',
            updatedAt: new Date(),
        }

        const updatedEntity = await ContactRequest.findByIdAndUpdate(
            entityToSave._id,
            { $set: entityToSave },
            { new: true } // Return the updated document
        );

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.updateOne({ '_id': entityToSave._id }, { $set: entityToSave })
        return updatedEntity
    } catch (err) {
        throw err
    }
}

async function approveContact(entity) {
    try {
        if (!entity.isApproved) {
            // Updating request to approved
            entity.contact.inStock = true
            entity.status = requestStatus.APPROVED
            entity.updatedAt = new Date()

            // Updating contact inStock
            await contactService.update(entity.contact)

            // Inserting contact to user array contact belongs
            const user = await userService.getById(entity?.contact?.agent?._id)
            if (user) {
                user.contactUploads.unshift(entity)
                await userService.update(user)
            }
            return await update(entity)
        }
    } catch (err) {
        throw err
    }
}

async function rejectContact(entity) {
    try {
        return await update(entity)
    } catch (err) {
        throw err
    }
}

function _approveContact(entity) {
    if (entity.isApproved) return false
    else return true
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    add,
    remove,
    update,
    approveContact,
    rejectContact,
}