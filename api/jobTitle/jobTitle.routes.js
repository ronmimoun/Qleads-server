const express = require('express')
const { query, remove, update, create } = require('./jobTitle.controller');
const { verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.post('/create', verifyTokenAndAdmin, create)
router.post('/update/:id', verifyTokenAndAdmin, update)
router.post('/:id', verifyTokenAndAdmin, remove)
router.post('/', query)

module.exports = router