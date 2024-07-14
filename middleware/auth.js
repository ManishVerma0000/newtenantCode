require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const shortId = require('shortid');
const { S3Client } = require('@aws-sdk/client-s3');

let s3 = new S3Client({
    region: process.env.AWS_S3_REGION_NAME,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});





const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, shortId.generate() + '-' + file.originalname);
        },
    }),
}).single('image');

module.exports = upload
