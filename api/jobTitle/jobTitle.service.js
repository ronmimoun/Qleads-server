const JobTitle = require('./jobTitle.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const jobTitles = await JobTitle.find({})
        return jobTitles
    } catch (err) {
        throw err
    }
}

async function update(jobTitle) {
    try {
        const catToSave = {
            title: jobTitle.title.toUpperCase(),
            value: jobTitle.value.toLowerCase(),
            img: jobTitle.img,
            _id: ObjectId(jobTitle._id),
        }

        const updatedJobTitle = await JobTitle.findByIdAndUpdate(
            catToSave._id,
            { $set: catToSave },
            { new: true }
        );

        return updatedJobTitle
    } catch (err) {
        throw err
    }
}

async function add(payload) {
    try {
        const jobTitleToSave = {
            title: payload.jobTitleName.toUpperCase(),
            value: payload.jobTitleName.toLowerCase()
        }
        const newJobTitle = new JobTitle(jobTitleToSave)
        const savedJobTitle = await newJobTitle.save()

        return savedJobTitle
    } catch (err) {
        throw err
    }
}

async function remove(jobTitleId) {
    try {
        await JobTitle.deleteOne({ '_id': ObjectId(jobTitleId) })
        return jobTitleId
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