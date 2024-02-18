const express = require('express')
const { create, get, getByContactId, getUsersWithMessages } = require('./agentMessage.controller');
const { verifyToken, verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.get('/', verifyTokenAndAdmin, get)
router.get('/:id', verifyToken, getByContactId)
router.post('/getUsers', verifyTokenAndAdmin, getUsersWithMessages)
router.post('/create', verifyToken, create)

module.exports = router