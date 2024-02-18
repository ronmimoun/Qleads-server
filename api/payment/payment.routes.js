const express = require('express')
const { createCreditPayment, removeContactPurchase, createContactPurchase } = require('./payment.controller')
const { verifyToken } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.post('/create', verifyToken, createCreditPayment)
router.post('/contact/purchase', verifyToken, createContactPurchase)
router.post('/contact/remove', verifyToken, removeContactPurchase)

module.exports = router