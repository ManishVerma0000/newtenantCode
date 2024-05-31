const express = require('express')
const router = express.Router();
const upload = require('../middleware/multer')


const { registerTenate, updateTenate, tenateProfile, deleteTenateProfile, Tenateprofile, netBill } = require('../controllers/registerTenate')
const listoftenate = require('../controllers/listoftenate')
const { listofbuilding, addbuilding, updateRoom, deleteBuildings,
    singleBuildingDetails,
    updateBuildings,
    findopenRoomsOfBuilding } = require('../controllers/addbuilding')
const { registerAdmin, loginadmin, changepassword, forgetPassword, adminProfile } = require('../controllers/registeradmin')
const findAvailableRoom = require('../controllers/findAviableroom')
const addharCardVerification = require('../controllers/addharCardVerification')
const { totalBill, pendingBill, updatePaymentsuccess, makepayementpending, completedPayement } = require('../controllers/rent')
const { generatepdf, pdf, generatepdffirstTimeuer } = require('../controllers/generatePdf')
const allVacanatRooms = require('../controllers/findallVacantRoom')
const additionalCharge = require('../controllers/additionalCharge')
const checkBillpending = require('../controllers/checkbillpending')
const { holdBills, updateHoldBills } = require('../controllers/holdBills')
const { monthlyCharge, caluclatedrent } = require('../controllers/monthlycharge')
const image = require('../controllers/generateimage')


router.get('/caluclatedrent', caluclatedrent)

router.get('/netBill', netBill)

router.post('/updateTenate', updateTenate)

router.get('/image', image)
router.get('/monthlyCharge', monthlyCharge)
router.get('/updateHoldBills', updateHoldBills)
router.get('/holdBills', holdBills)
router.get('/checkBillpending', checkBillpending)
router.post('/additionalCharge', additionalCharge)
router.get('/singleBuildingDetails', singleBuildingDetails)
router.get('/updateBuildings', updateBuildings)
router.get('/deleteBuildings', deleteBuildings)
router.get('/allVacanatRooms', allVacanatRooms)

router.get('/findopenRoomsOfBuilding', findopenRoomsOfBuilding)
router.post('/updateRoom', updateRoom)
router.get('/pdf', pdf)
router.get('/Tenateprofile', Tenateprofile)
router.get('/deleteTenateProfile', deleteTenateProfile)
router.post('/generatepdffirstTimeuer', generatepdffirstTimeuer)
router.post('/generatepdf', generatepdf)
router.get('/tenateProfile', tenateProfile)
router.get('/adminProfile', adminProfile)
router.post('/forgetPassword', forgetPassword)
router.post('/changepassword', changepassword)
router.get('/makepayementpending', makepayementpending)
router.get('/updatePayment', updatePaymentsuccess)
router.get('/completedPayement', completedPayement)
router.get('/pendingBill', pendingBill)
router.get('/totalBill', totalBill)
router.get('/addharCardVerification', addharCardVerification)
router.post('/findAvailableRoom', findAvailableRoom)
router.post('/login', loginadmin)
router.post('/register', registerAdmin)
router.post('/addbuilding', addbuilding)
router.get('/listofbuilding', listofbuilding)
router.post('/registertenate', registerTenate)
router.get('/list', listoftenate)

module.exports = router

