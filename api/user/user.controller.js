const userService = require('./user.service')
const dbService = require('../../services/db.service')
const User = require('./user.model')
const Token = require('../../models/Token')
const { ObjectId } = require('mongodb')

//DELETE
async function removeUser(req, res) {
    try {
        const { userId } = req.body
        await userService.remove(userId)
        res.status(200).json({ status: 'ok', content: userId })
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE
async function updateUser(req, res) {
    try {
        const updatedUser = req.body
        const savedUser = await userService.update(updatedUser)
        res.status(200).json({ status: 'ok', content: savedUser })
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET USER
async function getById(req, res) {
    try {
        const { userId } = req.body
        const user = await userService.getById(userId)
        res.status(200).json({ status: 'ok', content: user });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL USER
async function getUsers(req, res) {
    try {
        const filterBy = req.body
        const users = await userService.query(filterBy)
        res.status(200).json({ status: 'ok', content: users });
    } catch (err) {
        res.status(500).json(err);
    }
}

// CREATE USER
async function createUser(req, res) {
    try {
        const userCred = req.body
        const savedUser = await userService.add(userCred)
        res.status(200).json({ status: 'ok', content: savedUser })
    } catch (err) {
        res.status(500).json({ status: 'error' })
    }
}

// CHANGE USER PASSWORD
async function changeUserPassByEmail(req, res) {
    try {
        const { email, password } = req.body
        const result = await userService.changeUserPassByEmail(email, password)
        res.status(200).json({ status: 'ok', content: result })
    } catch (err) {
        res.status(500).json({ status: 'error' })
    }
}

//GET USER STATS
async function getUserStats(req, res) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        // const collection = await dbService.getCollection('user');
        // const users = await collection.aggregate([
        const users = await User.aggregate([
            {
                $match: { createdAt: { $gte: lastYear } }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]).toArray();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
}

// VERIFY_TOKEN
async function verifyUserToken(req, res) {
    try {
        const { id, token } = req.params
        const user = await User.findOne({ _id: ObjectId(id) })
        if (!user) return res.status(400).send({ message: 'Invaild link' })
        const userToken = await Token.findOne({ userId: user._id, token })
        if (!userToken) return res.status(400).send({ message: 'Invalid link' })
        await User.findOneAndUpdate(
            { _id: user._id },
            { $set: { verified: true } },
            { new: true }
        );
        await userToken.remove()
        res.status(200).send({ message: 'Email verified successfully' })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    removeUser,
    updateUser,
    getById,
    getUsers,
    createUser,
    getUserStats,
    changeUserPassByEmail,
    verifyUserToken
}
