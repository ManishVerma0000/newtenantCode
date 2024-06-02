const AWS = require('aws-sdk');
const xlsx = require('xlsx');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});



const Tenat = require('../schema/tenatModel')

const exportExcel = async (req, res) => {
    try {
        // Fetch data from MongoDB
        const tenats = await Tenat.find({}, 'username phone address orgnisation rent  addhar roomNo people NextInstallement advanceRent waterCharge electricitycharge otherCharge tenates');

        // Convert to JSON and then to a worksheet
        const tenatsJson = tenats.map(tenat => {
            const tenatObj = tenat.toObject();
            tenatObj.tenates = JSON.stringify(tenatObj.tenates); // Convert array to JSON string
            return tenatObj;
        });
        const worksheet = xlsx.utils.json_to_sheet(tenatsJson);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Tenats');

        // Generate Excel file in memory
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Set up S3 upload parameters
        const params = {
            Bucket: process.env.AWS_STORAGE_BUCKET_NAME, // Replace with your S3 bucket name
            Key: `tenats_${Date.now()}.xlsx`, // Generate a unique file name
            Body: excelBuffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ACL: 'public-read' // Optional: Make the file publicly readable
        };

        // Upload to S3
        s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }

            // Respond with the S3 file URL
            res.json({ message: 'File uploaded successfully', url: data.Location });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = exportExcel 