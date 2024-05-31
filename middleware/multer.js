const multer = require('multer')
const path = require('path')

const storage =
    multer.diskStorage({
        destination: path.join(__dirname, 'uploads'), // destination folder
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

const upload =
    multer({
        storage,
        dest: path.join(__dirname, 'public/img/'),
        limits: { fileSize: 3500000000 },
        fileFilter: (req, file, cb) => {
            const filetypes = /jpeg|jpg|png|gif|pdf/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname)); // extract the file extension

            if (mimetype && extname) {
                return cb(null, true);
            }

            return cb("The uploaded file, isn't compatible :( we're sorry");
        }
    }).single('image');


module.exports = upload