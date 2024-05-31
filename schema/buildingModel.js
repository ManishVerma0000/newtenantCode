const mongoose = require('mongoose')


const buildingSchema = new mongoose.Schema({
    buildingname: {
        type: String,
        default: ""
    },
    rooms: {
        type: [String],
        default: []
    },
    location: {
        type: String,
        default: ""
    },
    caretaker: {
        type: String,
        default: ""
    },

    phoneNumber: {
        type: String,
        default: ""
    },
    completedRoom: {
        type: Array,
        default: []
    },
    pendingRoom: {
        type: Array,
        default: []
    },
    buildingRoomName: {
        type: String,
        default: ""
    },

})

const building = mongoose.model('building', buildingSchema)

module.exports = building




