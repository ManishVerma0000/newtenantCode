const mongoose = require("mongoose");

const tenatSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  dateofjoining: {
    type: String,
    default: "",
  },
  rent: {
    type: String,
    default: "",
  },
  deposit: {
    type: String,
    default: "",
  },
  addhar: {
    type: Array,
    default: [],
  },
  roomNo: {
    type: String,
    default: "",
  },
  buildingId: {
    type: String,
    default: "",
  },
  people: {
    type: String,
    default: "",
  },

  NextInstallement: {
    type: String,
    default: "",
  },
  ispending: {
    type: Boolean,
    default: true,
  },
  advanceRent: {
    type: String,
    default: "",
  },

  electricitycharge: {
    type: String,
    default: "",
  },
  otherCharge: {
    type: String,
    default: "",
  },
 
  rentToBePaid: {
    type: String,
    default: "",
  },
  tenates: {
    type: Array,
    default: [],
  },

});

const tenat = mongoose.model("tenat", tenatSchema);

module.exports = tenat;
