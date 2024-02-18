const jobTitleService = require("./jobTitle.service")

//CREATE
async function create(req, res) {
    try {
        const payload = req.body
        const savedJobTitle = await jobTitleService.add(payload)
        res.status(200).json({ status: 'ok', content: savedJobTitle });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const jobTitle = req.body
        if (!jobTitle.title || !jobTitle.value) return res.status(401).json({ status: 'error', message: 'Credentials are missing' })
        const updatedJobTitle = await jobTitleService.update(jobTitle)
        res.status(200).json({ status: 'ok', content: updatedJobTitle });
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE
async function remove(req, res) {
    try {
        const { id } = req.params
        const jobTitleId = await jobTitleService.remove(id)
        res.status(200).json({ status: 'ok', content: jobTitleId });
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL JOB TITLES
async function query(req, res) {
    try {
        const jobTitles = await jobTitleService.get()
        res.status(200).json({ status: 'ok', content: jobTitles })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    query,
    remove,
    create,
    update
};