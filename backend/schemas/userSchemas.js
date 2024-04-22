const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

let userCredentials = new Schema({
  _id: { type: String, default: uuid.v1 },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
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
  transmission: {
    type: String,
  },
  clas: {
    type: String,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
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
