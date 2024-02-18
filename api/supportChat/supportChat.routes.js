const express = require('express')
const { query, create, addAdminMsg, getById } = require('./supportChat.controller');
const { verifyToken, verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.get('/', verifyToken, query)
router.get('/:id', verifyToken, getById)
router.post('/create', verifyToken, create)
router.post('/admin-msg', verifyTokenAndAdmin, addAdminMsg)


module.exports = router