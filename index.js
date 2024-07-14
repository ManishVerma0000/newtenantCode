
const dontenv = require('dotenv')
dontenv.config()
const express = require('express')
const app = express()
const port = 7000;
const fs = require('fs-extra')
const cors = require('cors')
const router = require('./routes/routes')
const conn = require('./conn/db')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const uploadsecond=require('./middleware/auth')

const sendEmail = require('./middleware/email')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("aws-sdk/lib/maintenance_mode_message").suppress = true;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', router)

const cron = require('node-cron');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'), // destination folder
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const directoryPath = './pdf';
const upload = multer({
    storage,
    limits: { fileSize: 3500000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }
        return cb("The uploaded file isn't compatible. We're sorry.");
    }
}).single('image');

app.post('/img',uploadsecond,async(req,res)=>{
    console.log(req.file)
})

app.post('/upload', upload, (req, res) => {
    console.log(req.file);
    if (!req.file) {
        console.log('pi is hit')
        return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
});
async function deleteAllFiles() {
    try {
        const files = await fs.readdir(directoryPath);
        await Promise.all(files.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            await fs.unlink(filePath);
            console.log('File deleted:', filePath);
        }));
    } catch (err) {
        console.error('Error reading directory or deleting files:', err);
    }
}

const checkBillpending = require('./controllers/checkbillpending')

cron.schedule('0 0 15 * *', () => {
    const currentTime = new Date().toLocaleTimeString();
    deleteAllFiles()
    console.log('Task executed at:', currentTime);
});


cron.schedule('0 0 1 * *', () => {
    checkBillpending();
    console.log('Task executed at:');
});

app.use('/pdf', express.static('pdf'))

app.post('/image', upload, async (req, res) => {

    console.log(req.file)
})




app.get('/', async (req, res) => {

    await res.status(200).send({ message: "welcome to the first page" })
})

const ipAddress = '192.168.205.211'

app.listen(port, () => {
    console.log(`server is listen on the port on  http://localhost:${port}`)
})
//172.19.224.1





'http://15.207.39.254:7000/'
//const pdfUrl = `${'http://15.207.39.254:7000'}/pdf/${pdfilename}.pdf`;