const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

let session = new Schema({
  _id: { type: String, default: uuid.v1 },
  user: { type: String, ref: "user", required: true },
  date: {
    type: Date,
    require: true,
  },
  clockedIn: {
    type: String,
    require: true,
  },
  clockedOut: {
    type: String,
  },
  maneuver: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
});

// create models from mongoose schemas
const Session = mongoose.model("session", session);
module.exports = { Session };
