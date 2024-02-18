const Image = require("./upload.model");

async function uploadImage(req, res) {
    try {
        const content = { url: req.file.location }
        const newImage = new Image(content)
        res.status(200).send({ status: 'ok', content: newImage })
    } catch (err) {
        res.status(500).send({ err: 'Failed to upload files' })
    }
}

async function getImage(req, res) {
    try {
        const images = await Image.find()
        res.status(200).send({ status: 'ok' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to upload files' })
    }
}

module.exports = {
    uploadImage,
    getImage
}