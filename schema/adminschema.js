const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    phone: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    }
})


const admin = mongoose.model('admin', adminSchema)

module.exports = admin
