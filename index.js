
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
const upload = require('./middleware/multer')
const sendEmail = require('./middleware/email')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



console.log(Date.now(), 'this si trhev')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', router)

const cron = require('node-cron');



console.log(new Date().toLocaleDateString())

const directoryPath = './pdf';

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

// deleteAllFiles();
const checkBillpending = require('./controllers/checkbillpending')

cron.schedule('0 0 15 * *', () => {
    const currentTime = new Date().toLocaleTimeString();
    deleteAllFiles()
    console.log('Task executed at:', currentTime);
});
// cron.schedule('*/2 * * * * *', () => {
//     console.log('running')
//     fsExtra.emptyDirSync(pdf);
// });

cron.schedule('0 0 1 * *', () => {
    checkBillpending();
    console.log('Task executed at:');
});


// Parse the input date string


app.use('/pdf', express.static('pdf'))

app.get('/image', upload, async (req, res) => {

    console.log(req.file)
})


console.log(new Date().toLocaleDateString(), 'new Date().toLocaleDateString()')

app.get('/', async (req, res) => {

    await res.status(200).send({ message: "welcome to the first page" })
})

const ipAddress = '192.168.244.169'

app.listen(port, () => {
    console.log(`server is listen on the port on  http://localhost:${port}`)
})
//172.19.224.1





'http://15.207.39.254:7000/'
//const pdfUrl = `${'http://15.207.39.254:7000'}/pdf/${pdfilename}.pdf`;