const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

let userCredentials = new Schema({
  _id: { type: String, default: uuid.v1 },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

// create models from mongoose schemas
const user = mongoose.model("users", userCredentials);
module.exports = { user };
