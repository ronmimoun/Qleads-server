import express from 'express';
import { authController } from './auth.controller.js';
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/send_recovery_email', authController.recoveryEmail)
router.post('/check_otp', authController.isValidOTP)

export default router
