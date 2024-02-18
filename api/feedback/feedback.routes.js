const express = require('express')
const { create, get, getUserFeedbacks } = require('./feedback.controller');
const { verifyToken } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.post('/', verifyToken, get)
router.get('/getUserFeedback', verifyToken, getUserFeedbacks)
router.post('/create', verifyToken, create)


module.exports = router