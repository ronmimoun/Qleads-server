const express = require('express')
const { upload } = require('./upload.service')
const { uploadImage, getImage } = require('./upload.controller')
const router = express.Router()

router.post('/upload', upload, uploadImage)
router.get('/get', getImage)

module.exports = router