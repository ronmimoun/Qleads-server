const express = require('express')
const { remove, update, create, getJobTitles } = require('./territory.controller');
const router = express.Router()

router.post('/', getJobTitles)
router.post('/create', create)
router.post('/update/:id', update)
router.post('/:id', remove)

module.exports = router