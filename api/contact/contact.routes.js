const express = require('express')
const { verifyTokenAndAdmin, verifyToken } = require("../../middlewares/requireAuth.middleware");
const { getUserContacts, add, update, remove, getById, getContacts, getContactByCategories, addMany, getNotRequestedContacts, sendContactDetailsEmail } = require('./contact.controller')
const router = express.Router()

router.post('/', verifyToken, getContacts)
router.post('/user', verifyToken, getUserContacts)
router.post('/create', verifyTokenAndAdmin, add)
router.post('/create/company', verifyTokenAndAdmin, addMany)
router.post('/update/:id', verifyTokenAndAdmin, update)
router.post('/not-requested', verifyToken, getNotRequestedContacts)
router.post('/download', verifyToken, sendContactDetailsEmail)
router.post('/:id', verifyTokenAndAdmin, remove)
router.get('/:category', verifyToken, getContactByCategories)
router.get('/find/:id', verifyToken, getById)

module.exports = router