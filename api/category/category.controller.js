const categoryService = require("./category.service")
const jobTitleService = require("../jobTitle/jobTitle.service")
const companyService = require("../company/company.service")
const countryService = require("../country/country.service")

//CREATE
async function create(req, res) {
    try {
        const payload = req.body
        const savedCategory = await categoryService.add(payload)
        res.status(200).json({ status: 'ok', content: savedCategory });
    } catch (err) {
        console.log('err', err)
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const category = req.body
        if (!category._id || !category.title) return res.status(401).json({ status: 'error', message: 'Credentials are missing' })

        const updatedCategory = await categoryService.update(category)
        res.status(200).json({ status: 'ok', content: updatedCategory });
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE
async function remove(req, res) {
    try {
        const { id } = req.params
        const catId = await categoryService.remove(id)
        res.status(200).json({ status: 'ok', content: catId });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL CATEGORIES
async function getCategories(req, res) {
    try {
        const categories = await categoryService.get()
        res.status(200).json({ status: 'ok', content: categories })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

async function getCategoriesManager(req, res) {
    try {
        const categories = await categoryService.get()
        const jobTitles = await jobTitleService.get()
        const companies = await companyService.get()
        const countries = await countryService.query()
        const content = { categories, jobTitles, companies, countries }

        res.status(200).json({ status: 'ok', content })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    getCategories,
    getCategoriesManager,
    create,
    update,
    remove,
}