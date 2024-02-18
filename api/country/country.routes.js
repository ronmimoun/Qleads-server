const express = require('express')
const { getCountry, create, update, remove } = require('./country.controller');
const { verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.post('/', verifyTokenAndAdmin, getCountry)
router.post('/create', verifyTokenAndAdmin, create)
router.post('/update/:id', verifyTokenAndAdmin, update)
router.post('/:id', verifyTokenAndAdmin, remove)

module.exports = router