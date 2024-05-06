const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

let userCredentials = new Schema({
  _id: { type: String, default: uuid.v1 },
  firstName: {
    type: String,
    require: true,
    set: (value) => value.toUpperCase(),
  },
  lastName: {
    type: String,
    require: true,
    set: (value) => value.toUpperCase(),
  },
  phone: {
    type: String,
    require: true,
  },
  DLnumber: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  transmission: {
    type: String,
  },
  clas: {
    type: String,
  },
  DOB: {
    type: String,
    default: "N/A",
  },
  permitExpiryDate: {
    type: String,
    default: "N/A",
  },
  username: {
    type: String,
    // require: true,
  },
  password: {
    type: String,
    // required: true,
  },
  Role: {
    type: String,
    required: true,
    default: "Student",
  },
});

// create models from mongoose schemas
const user = mongoose.model("users", userCredentials);
module.exports = { user };
