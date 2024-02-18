const countryService = require("./country.service")

//CREATE
async function create(req, res) {
    try {
        const country = req.body
        if (!country.name || !country.code) return res.status(500).json({ status: 'error', message: 'Missing credentials' });

        const savedCountry = await countryService.add(country)
        res.status(200).json({ status: 'ok', content: savedCountry });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const country = req.body
        if (!country.name || !country.code || !country._id) return res.status(500).json({ status: 'error', message: 'Credentials are missing' });

        const updatedCountry = await countryService.update(country)
        res.status(200).json({ status: 'ok', content: updatedCountry });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = req.params
        if (!id) return res.status(500).json({ status: 'error', message: 'Country ID is missing' });

        const deletedCountryId = await countryService.remove(id)
        res.status(200).json({ status: 'ok', content: deletedCountryId });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL
async function getCountry(req, res) {
    try {
        const countries = await countryService.query()
        res.status(200).json({ status: 'ok', content: countries })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}
module.exports = {
    getCountry,
    remove,
    create,
    update
};