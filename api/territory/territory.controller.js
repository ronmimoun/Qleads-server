const territoryService = require("./territory.service")

//CREATE
async function create(req, res) {
    try {
        const { territory } = JSON.parse(req.body.data)
        const savedEntity = await territoryService.add(territory)
        res.status(200).json({ status: 'ok', content: savedEntity });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const { entity } = JSON.parse(req.body.data)
        await territoryService.update(entity)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = JSON.parse(req.body.data)
        await territoryService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL JOB TITLES
async function getJobTitles(req, res) {
    try {
        const entities = await territoryService.get()
        res.status(200).json({ status: 'ok', content: entities })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    getJobTitles,
    create,
    remove,
    update
};