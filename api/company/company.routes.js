const express = require('express')
const { getCompanies, remove, update, create } = require('./company.controller');
const { verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.post('/', getCompanies)
router.post('/create', verifyTokenAndAdmin, create)
router.post('/update/:id', verifyTokenAndAdmin, update)
router.post('/:id', verifyTokenAndAdmin, remove)

module.exports = router