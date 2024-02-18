const Category = require('./category.model')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const categories = await Category.find({})
        return categories
    } catch (err) {
        throw err
    }
}

async function update(category) {
    try {
        const catToSave = {
            img: category.img,
            title: category.title,
            cat: category.title.toLowerCase(),
            _id: ObjectId(category._id),
        }
        const updatedCategory = await Category.findByIdAndUpdate({ '_id': catToSave._id }, { $set: catToSave }, { new: true })
        return updatedCategory
    } catch (err) {
        throw err
    }
}

async function remove(catId) {
    try {
        await Category.deleteOne({ '_id': ObjectId(catId) })
        return catId
    } catch (err) {
        throw err
    }
}

async function add(payload) {
    try {
        const catToSave = {
            title: payload.category,
            cat: payload.category.toLowerCase()
        }
        const newCategory = await Category(catToSave)
        const savedCategory = await newCategory.save()
        return savedCategory
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