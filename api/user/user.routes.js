const express = require('express')
const { verifyTokenAndAdmin, verifyToken, verifyAdmin } = require('../../middlewares/requireAuth.middleware')
const { removeUser, updateUser, getById, getUsers, createUser, getUserStats, changeUserPassByEmail, verifyUserToken, updateUserContactDisclosure } = require('./user.controller')
const router = express.Router()


router.post('/', verifyTokenAndAdmin, getUsers)
router.post('/update', verifyToken, updateUser)
router.post('/create', verifyTokenAndAdmin, createUser)
router.post('/stats', verifyTokenAndAdmin, getUserStats)
router.post('/remove/:id', verifyTokenAndAdmin, removeUser)
router.post('/find/:id', verifyToken, getById)
router.post('/update_user_contact_disclosure', verifyToken, updateUserContactDisclosure)
router.post('/update_user_pass', changeUserPassByEmail)
router.get('/:id/verify/:token', verifyUserToken)

module.exports = router