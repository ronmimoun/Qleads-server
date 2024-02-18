const creditTransactionService = require("./creditTransaction.service");

//CREATE
async function create(req, res) {
    try {
        const transaction = req.body
        await creditTransactionService.add(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const { transaction } = JSON.parse(req.body.data)
        await creditTransactionService.update(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = JSON.parse(req.body.data)
        await creditTransactionService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL
async function query(req, res) {
    try {
        const filterBy = req.query
        const transactions = await creditTransactionService.query(filterBy)
        res.status(200).json({ status: 'ok', content: transactions })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    query,
    create,
    update,
    remove
};