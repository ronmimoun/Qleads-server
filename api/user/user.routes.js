import express from 'express';
import { verifyTokenAndAdmin, verifyToken } from '../../middlewares/requireAuth.middleware.js';
import { removeUser, updateUser, getById, getUsers, createUser, getUserStats, changeUserPassByEmail, verifyUserToken } from './user.controller.js';
const router = express.Router()


router.post('/', verifyTokenAndAdmin, getUsers)
router.post('/update', verifyToken, updateUser)
router.post('/create', verifyTokenAndAdmin, createUser)
router.post('/stats', verifyTokenAndAdmin, getUserStats)
router.post('/remove/:id', verifyTokenAndAdmin, removeUser)
router.post('/find/:id', verifyToken, getById)
router.post('/update_user_pass', changeUserPassByEmail)
router.get('/:id/verify/:token', verifyUserToken)

export default router