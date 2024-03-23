const express = require('express')
const { send } = require('./openAI.controller')
const router = express.Router()

router.post('/send', send)

module.exports = router