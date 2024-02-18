const creditService = require("./credit.service")

//CREATE
async function create(req, res) {
    try {
        const credit = req.body
        const savedCredit = await creditService.add(credit)
        res.status(200).json({ status: 'ok', content: savedCredit });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const credit = req.body
        await creditService.update(credit)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = req.body
        await creditService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL
async function getCredits(req, res) {
    try {
        const credits = await creditService.query()
        res.status(200).json({ status: 'ok', content: credits })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}
module.exports = {
    getCredits,
    remove,
    create,
    update
};