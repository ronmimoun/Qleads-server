const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const { S3_ENDPOINT, BUCKET_NAME } = process.env
const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT)
const s3 = new aws.S3({
    endpoint: spacesEndpoint
})

const ACL = 'public-read'

const upload = multer({
    storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        acl: ACL,
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname
            })
        },
        key: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
}).single('upload')

module.exports = {
    upload,
    s3,
}