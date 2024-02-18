const express = require('express')
const { query, create, remove, update } = require('./creditTransaction.controller')
const { verifyTokenAndAdmin, validateToken } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.get('/', verifyTokenAndAdmin, query)
router.post('create', validateToken, create)
router.post('/:id', remove)
router.post('/update/:id', update)

module.exports = router