const contactTransactionService = require("./contactTransaction.service");

async function getUserTransactionByContactId(req, res) {
    try {
        const { usersId } = req.body
        const users = await contactTransactionService.getUsersTransactionByContactId(usersId)
        res.status(200).json({ status: 'ok', content: users })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

//CREATE
async function create(req, res) {
    try {
        const transaction = req.body
        await contactTransactionService.add(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const { transaction } = JSON.parse(req.body.data)
        await contactTransactionService.update(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = JSON.parse(req.body.data)
        await contactTransactionService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL
async function query(req, res) {
    try {
        const filterBy = req.query
        const transactions = await contactTransactionService.get(filterBy)
        res.status(200).json({ status: 'ok', content: transactions })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    getUserTransactionByContactId,
    create,
    remove,
    update,
    query,
};