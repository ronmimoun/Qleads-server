const userService = require('./user.service')
const User = require('./user.model')
const UserBL = require('./user.bl')
const { genericError } = require('../../models/errors/genericError')

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
async function verifyUserToken(req, res, next) {
    try {
        const { id, token } = req.params

        const user = await UserBL.getUserById(id)
        const userToken = await UserBL.getUserToken(user._id, token)
        await UserBL.approveUserToken(user._id)
        await userToken.remove()

        res.status(200).send({ status: 'ok', message: 'Email verified successfully' })
    } catch (error) {
        next(error);
    }
}

async function updateUserContactDisclosure(req, res, next) {
    try {
        const { revealCount } = req.body;
        const userId = req.user._id;

        if (revealCount === 0) {
            await UserBL.updateNextRevealCountReset(userId)
            return genericError(res, 403, "No more reveals")
        } else if (!revealCount) {
            return genericError(res, 500, "Something went wrong")
        }

        const updatedUser = await UserBL.updateUserContactDisclosure(userId, req.body)
        res.status(200).send({ status: 'ok', content: updatedUser })
    } catch (error) {
        next(error)
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
    verifyUserToken,
    updateUserContactDisclosure
}
