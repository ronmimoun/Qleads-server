
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const Token = require('../../models/Token')
const config = require('../../config')

const emailService = require('../../services/email.service')
const authService = require('../auth/auth.service')
const utilService = require('../../services/util.service')

// Services
const dbService = require('../../services/db.service')
const purchaseStatus = require('../../constants/PurchaseStatus')
const contactTransType = require('../../constants/contactTransType')

// Models
const ContactSale = require('../../models/ContactSale')
const Notification = require('../../models/Notification')
const User = require('./user.model')
const { CREDIT_VALUE } = require('../../constants/credit')

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const users = await User.find(criteria)
        const parsedUsers = users.map(user => {
            delete user.password
            return user
        })
        return parsedUsers
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        if (!userId) throw new Error('User ID is missing')

        const user = await User.findOne({ '_id': ObjectId(userId) })
        if (user) delete user.password
        return user
    } catch (err) {
        throw err
    }
}

async function getByUsername(username) {
    try {

        const user = await User.findOne({ username })
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // const user = await collection.findOne({ username })
        return user
    } catch (err) {
        throw err
    }
}

async function remove(userId) {
    try {
        if (!userId) throw new Error('User ID is missing')
        await User.deleteOne({ '_id': ObjectId(userId) })
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        throw err
    }
}

async function update(updatedUser) {
    try {
        // peek only updatable fields!
        const userToSave = {
            username: updatedUser.username,
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            imgUrl: updatedUser.imgUrl,
            phone: updatedUser.phone,
            address: updatedUser.address,
            favorites: updatedUser.favorites,
            permissions: updatedUser.permissions,
            credits: updatedUser.credits,
            creditTransactions: updatedUser.creditTransactions,
            contactTransactions: updatedUser.contactTransactions,
            contactUploads: updatedUser.contactUploads,
            searchHistory: updatedUser.searchHistory,
            notifications: updatedUser.notifications,
            income: updatedUser.income,
            countryPreferences: updatedUser.countryPreferences,
            agentMessages: updatedUser.agentMessages,
        }
        const savedUser = await User.findOneAndUpdate(
            { _id: ObjectId(updatedUser._id) },
            { $set: userToSave },
            { new: true }
        )
        return savedUser;
    } catch (err) {
        throw err
    }
}

async function add(userCred) {
    try {
        const saltRounds = 10
        const hash = await bcrypt.hash(userCred.password, saltRounds)
        const userToCreate = {
            username: userCred.username,
            password: hash,
            fullname: userCred.fullname,
            email: userCred.email,
            phone: userCred.phone,
            address: userCred.address,
            active: userCred.active,
            gender: userCred.gender,
            permissions: userCred.permissions,
        }
        if (!userCred.username || !userCred.password) return Promise.reject('fullname, username and password are required!')
        const newUser = new User(userToCreate)

        await User.insertOne(newUser)
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.insertOne(newUser)
        return newUser
    } catch (err) {
        throw err
    }
}

async function create(user) {
    try {
        const saltRounds = +process.env.SALT
        const hash = await bcrypt.hash(user.password, saltRounds)

        const content = {
            username: user.username,
            password: hash,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone
        }

        const newUser = new User(content)
        const savedUser = await newUser.save()

        try {
            const token = await new Token({
                userId: savedUser._id,
                token: utilService.generateRandomNumber(10)
            })
            const savedToken = await token.save()
            const url = `https://qleads.mobi/api/users/${savedUser._id}/verify/${savedToken.token}`
            await emailService(savedUser.email, "Verify Email", url)
        } catch (err) {
            throw new Error('Cannot send verification link')
        }

        return savedUser
    } catch (err) {
        throw err
    }
}

async function addUserPruchase(purchase) {
    try {
        const user = await getById(purchase.buyer)
        user.credits -= purchase.purchasePrice
        user.purchases.unshift(purchase)
        const savedUser = await update(user)
        return { status: purchaseStatus.success, updatedUser: savedUser }
    } catch (error) {
        throw error
    }
}

async function addCreditTransaction(transactions, userId) {
    try {
        let user = await getById(userId)
        transactions.forEach(trans => {
            user.credits += trans.creditQuantity
            user.creditTransactions.unshift(trans)
        })
        await update(user)
        return user
    } catch (err) {
        throw err
    }
}

async function addContactTransaction(transactions, user) {
    try {
        transactions.forEach(transaction => {
            user.credits -= (transaction.priceInCredit * CREDIT_VALUE)
            user.contactTransactions.unshift(transaction)
        })
        await update(user)
        return { status: purchaseStatus.success, updatedUser: user }
    } catch (err) {
        throw err
    }
}

async function addContactTransactionSale(transaction, user) {
    try {
        const userToUpdate = { ...user }
        const updatedSale = {
            type: contactTransType.contactSale,
            contact: transaction.contact,
            priceInCredit: transaction.priceInCredit,
            createdAt: transaction.createdAt,
            sellerUserId: user._id,
            buyingUserId: transaction.userId
        }

        const saleTransaction = new ContactSale(updatedSale)
        if (transaction?.contact?.agent?._id === user?._id.toString()) {
            userToUpdate.income += (CREDIT_VALUE / 2)
            userToUpdate.contactTransactions.unshift(saleTransaction)
            const updatedUser = await update(userToUpdate)
            return { status: purchaseStatus.success, saleTransaction: saleTransaction, updatedUser }
        } else return { status: purchaseStatus.failed }
    } catch (err) {
        throw err
    }
}

async function updateAgentCredits(agentUser, credits) {
    try {
        const userToUpdate = { ...agentUser }
        userToUpdate.income += (credits / 2)
        const updatedUser = await update(userToUpdate)
        return updatedUser
    } catch (error) {
        throw error
    }
}

async function removeContactTransaction(transaction, user) {
    try {
        user.credits += (transaction.priceInCredit * CREDIT_VALUE)
        const updatedTransactions = user.contactTransactions.filter(trans => {
            return trans._id.toString() !== transaction._id.toString()
        })
        user.contactTransactions = updatedTransactions
        const savedUser = await update(user)
        return savedUser
    } catch (err) {
        throw err
    }
}

async function addNotification(user, type) {
    try {
        const updatedUser = { ...user }
        const message = _notificationType(type)
        const newNotification = new Notification({ message, type })
        updatedUser.notifications.unshift(newNotification)
        await update(updatedUser)
        return newNotification
    } catch (err) {
        throw err
    }
}

async function changeUserPassByEmail(email, password) {
    try {
        if (!email && !password) throw new Error('Credentials are required: email, password')
        const user = await User.findOne({ 'email': email })
        if (!user) throw new Error('Cannot find user matching this email:', email)

        const encryptedPass = await authService.encodeUserPassword(password)
        const userToSave = { ...user, password: encryptedPass }
        await User.updateOne({ '_id': user._id }, { $set: userToSave })
        return true
    } catch (err) {
        throw err
    }
}

async function sendEmailVerification(user) {
    try {
        let userToken = await Token.findOne({ userId: new ObjectId(user._id) })

        if (!userToken) {
            const token = await new Token({
                userId: user._id,
                token: utilService.generateRandomNumber(10)
            })
            userToken = await token.save()
        }

        const url = `https://qleads.mobi/api/users/${user._id}/verify/${userToken.token}`

        const message = {
            to: user.email,
            subject: "Verify Email",
            text: url
        }

        await emailService.sendEmail(message)
    } catch (error) {
        throw error
    }
}

const isUserHasCredits = (transactions, user) => {
    const sum = transactions.reduce((acc, trans) => acc += trans.contact.price, 0)
    if (user.credits >= utilService.getContactValueInCredit(sum)) return true
    else return false
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.createdAt) {
        criteria.createdAt = {
            $gte: new Date(filterBy.createdAt.startOfWeek),
            $lt: new Date(filterBy.createdAt.endOfWeek)
        }
    }

    if (filterBy.transactionContactId) {
        criteria['contactTransactions.contact._id'] = filterBy.transactionContactId;
    }
    return criteria
}

function _notificationType(type) {
    switch (type) {
        case contactTransType.contactSale:
            return 'You have just made a sale!'
        case contactTransType.contactPurchase:
            return 'Someone has just made a purchase from you!'
        default:
            break;
    }
}

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    create,
    addCreditTransaction,
    addContactTransaction,
    removeContactTransaction,
    addContactTransactionSale,
    addNotification,
    changeUserPassByEmail,
    sendEmailVerification,
    isUserHasCredits,
    updateAgentCredits,
    addUserPruchase,
}