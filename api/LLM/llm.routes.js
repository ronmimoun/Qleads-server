const express = require('express')
const { send, getContactLLMInfoSearch } = require('./llm.controller')
const { verifyToken } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.post('/send', verifyToken, send)
router.post('/getContactLLMInfoSearch', verifyToken, getContactLLMInfoSearch)

module.exports = router