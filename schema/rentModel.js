const mongoose = require('mongoose')


const rentSchema = new mongoose.Schema({
    Amount: {
        type: String,
        default: ""
    },
    TenateId: {
        type: String,
        default: ""
    },
    Month: {
        type: String,
        default: ""
    },
    ispending: {
        type: Boolean,
        default: true
    },
    ishold: {
        type: Boolean,
        default: false
    },
    billDate: {
        type: Date,
        required: true
    }
})

const rent = mongoose.model('rent', rentSchema)
module.exports = rent