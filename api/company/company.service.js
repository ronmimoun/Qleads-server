const Company = require('./company.model')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const companies = await Company.find({})
        return companies
    } catch (err) {
        throw err
    }
}

async function update(entity) {
    try {
        const companyToUpdate = {
            _id: ObjectId(entity._id),
            company: entity.company,
            category: entity.category,
            img: entity.img,
        }
        const updatedCompany = await Company.findOneAndUpdate({ '_id': companyToUpdate._id }, { $set: companyToUpdate }, { new: true });
        return updatedCompany
    } catch (err) {
        throw err
    }
}

async function add(payload) {
    try {
        const companyToSave = {
            company: payload.company,
            category: payload.category
        }

        const newCompany = await Company(companyToSave)
        const savedCompany = await newCompany.save()
        return savedCompany
    } catch (err) {
        throw err
    }
}

async function remove(companyId) {
    try {
        await Company.deleteOne({ '_id': ObjectId(companyId) })
        return companyId
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