const express = require('express')
const { getCredits, create, update, remove } = require('./credit.controller');
const router = express.Router()

router.post('/', getCredits)
router.post('/create', create)
router.post('/update/:id', update)
router.post('/:id', remove)

module.exports = router