const express = require('express')
const { validateToken, verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const { create, remove, update, reject, query } = require('./contactRequest.controller');
const router = express.Router()

router.get('/', query)
router.post('/create', validateToken, create)
router.delete('/remove/:id', validateToken, remove)
router.post('/update', verifyTokenAndAdmin, update)
router.post('/reject', validateToken, reject)

module.exports = router