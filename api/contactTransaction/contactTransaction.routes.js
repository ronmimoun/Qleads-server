const express = require('express')
const { verifyTokenAndAdmin, validateToken } = require('../../middlewares/requireAuth.middleware')
const { getUserTransactionByContactId, create, update, remove, query } = require('./contactTransaction.controller')
const router = express.Router()

router.get('/', verifyTokenAndAdmin, query)
router.post('/users', validateToken, getUserTransactionByContactId)
router.post('/create', validateToken, create)
router.post('/update/:id', update)
router.post('/:id', remove)

module.exports = router