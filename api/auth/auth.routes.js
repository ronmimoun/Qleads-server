const express = require('express')
const { register, login, logout, isAdmin, recoveryEmail, isValidOTP } = require('./auth.controller')
const { verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.post('/register', register)
router.post('/isAdmin', verifyTokenAndAdmin, isAdmin)
router.post('/login', login)
router.post('/logout', logout)
router.post('/send_recovery_email', recoveryEmail)
router.post('/check_otp', isValidOTP)

module.exports = router