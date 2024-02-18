const ContactTransaction = require("../contactTransaction/contactTransaction.model")
const purchaseStatus = require('../../constants/PurchaseStatus')
const CreditTransaction = require('../creditTransaction/creditTransaction.model')

const userService = require("../user/user.service")
const contactTransactionService = require("../contactTransaction/contactTransaction.service")
const contactSaleService = require("../../services/contactSale.service")
const creditTransactionService = require("../creditTransaction/creditTransaction.service")
const contactService = require("../contact/contact.service")
const socketService = require("../../services/socket.service")
const paymentService = require("./payment.service")


//CREATE
async function createCreditPayment(req, res) {
    try {
        const transactions = req.body
        const userId = req.user._id


        // Process the payment for each credit
        const payments = await Promise.all(
            transactions.map(async (credit) => {
                const payment = paymentService.processPayment(credit);
                return payment;
            })
        );

        // Checks if the payment successed
        const isPaymentCancled = payments.some(payment => !payment.success)
        if (isPaymentCancled) return res.status(402)
        // Modeling the transactions
        const creditsToSave = transactions.map(transaction => new CreditTransaction({ ...transaction }))

        // Update the credit_transaction collection for each credit
        const credits = await creditTransactionService.add(creditsToSave)


        //  Update the user's credit transaction history 
        const updatedUser = await userService.addCreditTransaction(credits, userId)
        if (!updatedUser) return res.status(401)
        res.status(200).json({ status: 'ok', content: updatedUser })
    } catch (err) {
        res.status(500)
    }
}

async function createContactPurchase(req, res) {
    try {
        const { transactions, type } = req.body
        const userId = req.user._id
        // Checks user credits status
        const purchaseUser = await userService.getById(userId)

        if (!purchaseUser) return res.status(401).json({ status: 'User not found' })
        else if (!userService.isUserHasCredits(transactions, purchaseUser)) return res.status(409).json({ status: 'error' })

        // Modeling the transactions
        const contactTransToSave = transactions.map(transaction => new ContactTransaction({ ...transaction, type, userId }))

        // Updating user agent in credit and the relevant transaction
        contactTransToSave.forEach(async transaction => {
            const agentId = transaction?.contact?.agent?._id
            if (agentId) {
                const agentUser = await userService.getById(agentId)

                if (agentUser) {
                    const { saleTransaction, status, updatedUser } = await userService.addContactTransactionSale(contactTransToSave, agentUser)
                    if (status === purchaseStatus.success) {
                        await contactSaleService.add(saleTransaction)
                        const newNotification = await userService.addNotification(updatedUser, type)
                        socketService.emitToUser({ type: 'set-user-contact', data: newNotification, userId: agentId })
                    }
                }
            }
            // Update the contact_transaction collection for each contact
            await contactTransactionService.add(transaction)

            // Update the contact
            await contactService.updateContactTransaction(transaction)

        })
        // Update the user's credit transaction history 
        const { updatedUser, status } = await userService.addContactTransaction(contactTransToSave, purchaseUser)
        if (status !== purchaseStatus.success) return res.status(401)
        res.status(200).json({ status: 'ok', content: updatedUser })
    } catch (err) {
        res.status(500).json(err)
        throw err
    }
}

async function removeContactPurchase(req, res) {
    try {
        const { transactionId } = req.body
        const userId = req.user._id

        // Checks if user exists
        const user = await userService.getById(userId)
        if (!user) return res.status(401).json({ status: 'error', message: 'Not Authorized' })

        // Finding user transaction
        const contactTransaction = user.contactTransactions.find(trans => {
            return trans._id.toString() === transactionId
        })

        if (!contactTransaction) return res.status(403).json({ status: 'error', message: 'You do not own this contact' })

        // Removing the contact purchase from the DB
        await contactTransactionService.remove(contactTransaction._id)

        // Update the user's credit transaction history 
        const updatedUser = await userService.removeContactTransaction(contactTransaction, user)
        res.status(200).json({ status: 'ok', content: updatedUser })
    } catch (err) {
        res.status(500).json(err)
        throw err
    }
}



module.exports = {
    createCreditPayment,
    removeContactPurchase,
    createContactPurchase,
};