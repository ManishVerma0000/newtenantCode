const puppeteer = require('puppeteer');
const AWS = require('aws-sdk');
const axios = require('axios');
const tenat = require('../schema/tenatModel');
const { v4: uuidv4 } = require('uuid');
const building = require('../schema/buildingModel');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION_NAME
});

const s3 = new AWS.S3();

const generatepdf = async (req, res) => {
    const findBuilding = await building.findById(req.body.buildingId)
    try {
        const html1 = `<!DOCTYPE html>
<html>

<head>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
        body {
            margin-top: 20px;
            color: #484b51;
            font-family: Arial, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .text-secondary-d1 {
            color: #728299;
        }

        .page-header {
            margin: 0 0 1rem;
            padding-bottom: 1rem;
            padding-top: .5rem;
            border-bottom: 1px dotted #e2e2e2;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .page-title {
            padding: 0;
            margin: 0;
            font-size: 1.75rem;
            font-weight: 300;
        }

        .brc-default-l1 {
            border-color: #dce9f0;
        }

        hr {
            margin-top: 1rem;
            margin-bottom: 1rem;
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, .1);
        }

        .text-grey-m2 {
            color: #888a8d;
        }

        .text-success-m2 {
            color: #86bd68;
        }

        .font-bolder,
        .text-600 {
            font-weight: 600;
        }

        .text-110 {
            font-size: 110%;
        }

        .text-blue {
            color: #478fcc;
        }

        .pb-25,
        .py-25 {
            padding-bottom: .75rem;
        }

        .pt-25,
        .py-25 {
            padding-top: .75rem;
        }

        .bgc-default-tp1 {
            background-color: rgba(121, 169, 197, .92);
        }

        .bgc-default-l4,
        .bgc-h-default-l4:hover {
            background-color: #f3f8fa;
        }

        .page-header .page-tools {
            align-self: flex-end;
        }

        .btn-light {
            color: #757984;
            background-color: #f5f6f9;
            border-color: #dddfe4;
            padding: 5px 10px;
            border: 1px solid #dddfe4;
            text-decoration: none;
        }

        .w-2 {
            width: 1rem;
        }

        .text-120 {
            font-size: 120%;
        }

        .text-primary-m1 {
            color: #4087d4;
        }

        .text-danger-m1 {
            color: #dd4949;
        }

        .text-blue-m2 {
            color: #68a3d5;
        }

        .text-150 {
            font-size: 150%;
        }

        .text-60 {
            font-size: 60%;
        }

        .text-grey-m1 {
            color: #7b7d81;
        }

        .align-bottom {
            vertical-align: bottom;
        }

        /* Custom Styles */
        .invoice-details {
            margin-left: auto;
            /* Align to the right */
            text-align: right;
        }

        .invoice {
            margin-left: 20px;
            /* Add space before "invoice" text */
        }
    </style>
</head>

<body>
    <div class="page-content container">
        <div class="page-header text-blue-d2">
            <h1 class="page-title text-secondary-d1">
                <span class="invoice">Cash Memo</span>
                <small class="page-info">
                    <i class="fa fa-angle-double-right text-80"></i>
                    ID:
                </small>
            </h1>
        </div>

        <div class="container px-0">
            <div class="row mt-4">
                <div class="col-12 col-lg-12">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center text-150">
                                <i class="fa fa-home fa-2x text-success-m2 mr-1"></i>
                                <span class="text-default-d3">Jaru Construction</span>
                                <div>
                                    <span class="text-default-d3" style="font-size: smaller;">plot no. 88 Rushabh Nagar
                                        Baroi-Mundra Road, Mundra-Kutch</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="row brc-default-l1 mx-n1 mb-4" />
                    <div class="row">
                        <table class="invoice-details">
                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">To:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${req.body.username}</span>
                                </td>

                            <tr>
                                <td>

                                    <span class="text-sm text-grey-m2 align-middle">Address:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${req.body.address}</span>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">Phone:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${req.body.phone}</span>


                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">Orgnisation:</span>
                                    <span
                                        class="text-600 text-110 text-blue align-middle">${req.body.orgnisation}</span>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">Room No:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${req.body.roomNo}</span>

                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">BuildingName No:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${findBuilding.buildingname}
                                        ${' '} ${findBuilding.location} </span>
                                </td>
                            </tr>


                        </table>
                    </div>

                    <div class="mt-4">
                        <table>
                            <thead>
                                <tr class="text-600 text-white bgc-default-tp1 py-25">
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody class="text-95 text-secondary-d3">
                                <tr class="mb-2 mb-sm-0 py-25">
                                    <td>1</td>
                                    <td>Monthly Rent</td>
                                    <td>1</td>
                                    <td>${req.body.rent}</td>
                                    <td>${req.body.rent}</td>

                                </tr>
                                <tr class="mb-2 mb-sm-0 py-25 bgc-default-l4">
                                    <td>2</td>
                                    <td>Advance Rent</td>
                                    <td>1</td>
                                    <td>${req.body.waterCharge}</td>
                                    <td>${req.body.waterCharge}</td>

                                </tr>


                            </tbody>
                        </table>

                        <hr />
                    </div>

                    <div class="row">
                        <table class="invoice-details">
                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">Extra note such as company or
                                        payment information...</span>
                                </td>
                                <td>
                                    <hr class="d-sm-none" />
                                    <div class="text-grey-m2" style="margin-left: 10%;">
                                        <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                                class="text-600 text-100" style="margin-right: 48px;">Sub Total</span>
                                            ${parseInt(req.body.rent) + parseInt(req.body.electricitycharge) +
            parseInt(req.body.otherCharge) + parseInt(req.body.waterCharge)}</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>


                    <div class="row">
                        <table class="invoice-details">
                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">This Cash memo is only for the
                                        convenience of the customer and it will not be considered as any legal proof,
                                        This is a computer generated cash memo</span>
                                </td>
                                <td>
                                    <hr class="d-sm-none" />
                                    <div class="text-grey-m2" style="margin-left: 40%;">
                                        <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                                class="text-600 text-90">Issue
                                                Date:</span> ${new Date().toLocaleDateString()}</div>

                                        <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                                class="text-600 text-90">Status:</span> <span
                                                class="badge badge-warning badge-pill px-25">Unpaid</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <span class="text-secondary-d1 text-105">Thank you for your business</span>
                        <a href="#" class="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0">Pay Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>`;

        if (html1) {
            puppeteer
                .launch({
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                })
                .then(async browser => {



                    const page = await browser.newPage();
                    const html = html1;
                    await page.setContent(html, {
                        waitUntil: 'domcontentloaded'
                    });

                    const pdfBuffer = await page.pdf({
                        format: 'A4'
                    });

                    await browser.close();

                    const pdfFilename = `${uuidv4()}.pdf`;
                    const bucketName = 'YOUR_S3_BUCKET_NAME';
                    const s3Params = {
                        Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
                        Key: pdfFilename,
                        Body: pdfBuffer,
                        ContentType: 'application/pdf',
                        ACL: 'public-read' // Adjust as needed
                    };

                    s3.upload(s3Params, (error, data) => {
                        if (error) {
                            console.error(error);
                            return res.status(400).send({ message: error.message });
                        }

                        const pdfUrl = data.Location;
                        console.log(pdfUrl, 'this is thevakue of the url')
                        return res.status(200).send({ data: pdfUrl });
                    });
                })
                .catch(error => {
                    console.error(error);
                    return res.status(400).send({ message: error.message });
                });
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
};

const pdf = async (req, res) => {
    try {
        const tenateid = req.query.id;
        if (!tenateid) {
            return res.status(400).send('please enter the tenant id');
        }

        const data = await tenat.findById({ _id: tenateid });
        if (data) {
            axios.post('http://15.207.39.254:7000/api/generatepdf', data)
                .then(response => {
                    res.status(200).send(response.data.data);
                })
                .catch(err => {
                    console.log(err.message);
                    res.status(400).send({ message: err.message });
                });
        } else {
            res.status(404).send('Tenant not found');
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
};

module.exports = { generatepdf, pdf };
