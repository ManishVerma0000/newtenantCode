const mongoose = require('mongoose')


const tenatSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    orgnisation: {
        type: String,
        default: ""
    },

    dateofjoining: {
        type: String,
        default: ""
    },
    rent: {
        type: String,
        default: ""
    }
    ,
    addhar: {
        type: String,
        default: ""
    },
    roomNo: {
        type: String,
        default: ""
    },
    buildingId: {
        type: String,
        default: ""
    },
    people: {
        type: String,
        default: ""
    },

    NextInstallement: {
        type: String,
        default: ""
    },
    ispending: {
        type: Boolean,
        default: true
    },
    advanceRent: {
        type: String,
        default: ""
    },
    waterCharge: {
        type: String,
        default: ""
    },
    electricitycharge: {
        type: String,
        default: ""
    },
    otherCharge: {
        type: String,
        default: ""
    },
    onhold: {
        type: Boolean,
        default: false
    },
    rentToBePaid: {
        type: String,
        default: ""
    },
    tenates: {
        type: Array,
        default: []
    },
    theBillisFirstTime: {
        type: Boolean,
        default: false
    }
})

const tenat = mongoose.model('tenat', tenatSchema)

module.exports = tenat




