const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

let appointment = new Schema({
  _id: { type: String, default: uuid.v1 },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  DOB: {
    type: String,
    require: true,
  },
  DLnumber: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  location: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  truck: {
    type: String,
    require: true,
  },
  transmission: {
    type: String,
  },
  permitExpiryDate: {
    type: String,
    require: true,
  },
  checkboxOption: {
    type: String,
    require: true,
  },
});

// create models from mongoose schemas
const Appointment = mongoose.model("appointment", appointment);
module.exports = { Appointment };
