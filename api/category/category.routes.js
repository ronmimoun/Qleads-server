const express = require('express')
const { create, update, remove, getCategoriesManager, getCategories } = require('./category.controller');
const { verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.get('/', getCategories)
router.post('/create', verifyTokenAndAdmin, create)
router.post('/update/:id', verifyTokenAndAdmin, update)
router.post('/:id', verifyTokenAndAdmin, remove)
router.get('/all-categories', getCategoriesManager)

module.exports = router