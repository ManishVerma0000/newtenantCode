const building = require('../schema/buildingModel');
const Building = require('../schema/buildingModel');
const tenat = require('../schema/tenatModel')

const puppeteer = require('puppeteer')
const AWS = require('aws-sdk');

const { v4: uuidv4 } = require('uuid');

const netBill = async (req, res) => {
    const totalRent = parseInt(3000)

    if (!totalRent) {
        return res.status(400).json({ error: 'Invalid input. Please provide a valid totalRent.' });
    }

    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const remainingDays = lastDayOfMonth.getDate() - today.getDate() + 1;

    const dailyRent = totalRent / daysInMonth;
    const proratedRent = dailyRent * remainingDays;

    res.json({
        totalRent,
        dailyRent: dailyRent.toFixed(2),
        remainingDays,
        proratedRent: proratedRent.toFixed(2)
    });
}


const registerTenate = async (req, res) => {
    try {
        const { username,
            tenates,
            email, phone, address, orgnisation, dateofjoining, rent, addhar, roomNo, buildingId, advanceRent } = req.body;
        console.log(req.body.tenates)


        let dateObj = new Date(dateofjoining);

        const totalRent = parseInt(rent)
        const today = dateObj;
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const daysInMonth = lastDayOfMonth.getDate();
        const remainingDays = lastDayOfMonth.getDate() - today.getDate() + 1;

        const dailyRent = totalRent / daysInMonth;
        const proratedRent = dailyRent * remainingDays;

        const rentToBePaid1 = parseInt(rent) - proratedRent


        dateObj.setMonth(dateObj.getMonth() + 1);
        dateObj.setDate(1);
        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, "0");
        let day = String(dateObj.getDate()).padStart(2, "0");
        let formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate)
        const savedb = await tenat.create({
            dateofjoining: dateofjoining,
            username: username,
            email: '',
            phone: phone,
            addhar: addhar,
            address: address,
            orgnisation: orgnisation,
            rent: rent, roomNo: roomNo,
            buildingId: buildingId,
            NextInstallement: formattedDate,
            ispending: false,
            advanceRent: advanceRent, onhold: true,
            rentToBePaid: rentToBePaid1,
            tenates: tenates,
            theBillisFirstTime: true
        });
        console.log(savedb)

        const selectedRooms = roomNo
        const building = await Building.findById(buildingId);
        const formattedSelectedRooms = Array.isArray(selectedRooms) ? selectedRooms : [selectedRooms];
        building.completedRoom.push(...formattedSelectedRooms);
        building.rooms = building.rooms.filter(room => !formattedSelectedRooms.includes(room));
        await building.save();

        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_REGION_NAME
        });

        const s3 = new AWS.S3();
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
                   ${Date.now()}
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
                                    <span class="text-600 text-110 text-blue align-middle">${username}</span>
                                </td>

                            <tr>
                                <td>

                                    <span class="text-sm text-grey-m2 align-middle">Address:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${address}</span>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">Phone:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${phone}</span>


                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">Orgnisation:</span>
                                    <span
                                        class="text-600 text-110 text-blue align-middle">${orgnisation}</span>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">Room No:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${roomNo}</span>

                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <span class="text-sm text-grey-m2 align-middle">BuildingName No:</span>
                                    <span class="text-600 text-110 text-blue align-middle">${building.buildingname}
                                        ${' '} ${building.location} </span>
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
                                    <td>${rent}</td>
                                    <td>${rent}</td>

                                </tr>
                                <tr class="mb-2 mb-sm-0 py-25 bgc-default-l4">
                                    <td>2</td>
                                    <td>Advance Rent</td>
                                    <td>1</td>
                                    <td>${advanceRent}</td>
                                    <td>${advanceRent}</td>

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
                                            ${parseInt(rent) +
                parseInt(advanceRent)}</div>
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



    } catch (error) {
        console.log(error)
        await res.status(400).send(error.message)
    }
}
const updateTenate = async (req, res) => {
    try {

        const _id = req.params.id;
        var userdetails;
        if (!_id) {
            await res.status(400).send({ message: "Please provide the id for the update" })
        }
        else {
            userdetails = tenat.findById(_id);


        }

        const updateObject = {}
        const { username, email, phone, address, orgnisation, buildingno, dateofjoining, rent } = req.body;
        if (username) {
            updateObject['username'] = username
        } else {
            updateObject['username'] = userdetails['username']
        }

        if (email) {
            updateObject['email'] = email
        }
        else {
            updateObject['email'] = userdetails['email']
        }

        if (phone) {
            updateObject['phone'] = phone
        }
        else {
            updateObject['phone'] = userdetails['phone']
        }
        if (address) {
            updateObject['address'] = address
        }
        else {
            updateObject['address'] = userdetails['address']
        }

        if (orgnisation) {
            updateObject['orgnisation'] = orgnisation
        }
        else {
            updateObject['orgnisation'] = userdetails['orgnisation']
        }
        if (buildingno) {
            updateObject['buildingno'] = buildingno
        } else {
            updateObject['buildingno'] = userdetails['buildingno']
        }
        if (dateofjoining) {
            updateObject['dateofjoining'] = dateofjoining
        } else {
            updateObject['dateofjoining'] = userdetails['dateofjoining']
        }
        if (rent) {
            updateObject['rent'] = rent
        } else {
            updateObject['rent'] = userdetails['rent']
        }

        const updaateDb = await tenat.findByIdAndUpdate(_id, updateObject)
        await res.status(200).send(updaateDb)

    } catch (error) {

        await res.status(400).send(error.message)
    }
}



const tenateProfile = async (req, res) => {
    try {

        const _id = req.query.id;
        const tenatedetails = await tenat.findById(_id)
        await res.status(200).send(tenatedetails)
    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}




const deleteTenateProfile = async (req, res) => {
    try {
        const tenatId = req.query.id;
        if (!tenatId) {
            return res.status(400).send({ message: "Please enter the id" });
        }

        // Find the tenant by ID
        const deleteuser = await tenat.findById(tenatId);
        if (!deleteuser) {
            return res.status(404).send({ message: "Tenant not found" });
        }

        const roomNo = deleteuser.roomNo;
        const buildingId = deleteuser.buildingId;

        // Find the building by the tenant's building ID
        const updateBuildings = await Building.findById(buildingId);
        console.log(updateBuildings, 'this is the value of the building before the value changes')
        if (!updateBuildings) {
            return res.status(404).send({ message: "Building not found" });
        }

        // Check if the room is in completedRoom array and remove it
        const completedRoomIndex = updateBuildings.completedRoom.indexOf(roomNo);
        if (completedRoomIndex > -1) {
            updateBuildings.completedRoom.splice(completedRoomIndex, 1);
        }

        // Add the room to the rooms array if it's not already there
        if (!updateBuildings.rooms.includes(roomNo)) {
            updateBuildings.rooms.push(roomNo);
        }

        // Save the updated building
        const data = await updateBuildings.save();
        console.log(data, 'after the logic is applied this is the fina; value')

        // Delete the tenant
        await tenat.findByIdAndDelete(tenatId);

        res.status(200).send({ message: "Deleted successfully..." });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


const Tenateprofile = async (req, res) => {
    try {

        const tenatId = req.query.id;
        if (!tenatId) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const tenateDeatils = await tenat.findById(tenatId)
            // const deleteuser = await tenat.findByIdAndDelete({ _id: tenatId })
            await res.status(200).send({ message: "updated successfullly", data: tenateDeatils })
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


module.exports = { registerTenate, updateTenate, tenateProfile, deleteTenateProfile, Tenateprofile, netBill }