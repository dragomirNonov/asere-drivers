const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const users = require("../data/usersData");
// const userAuthentication = require("../services/basicAuth");
// let authUser = userAuthentication.authUser;
let { appointment } = require("../schemas/appointmentsSchema");

// Addind new appointment
router.post("/api/newappointment", async (request, response) => {
  try {
    const newAppointment = new appointment({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      DOB: request.body.DOB,
      // DLnumber: bcrypt.hashSync(request.body.DLnumber, 10),
      DLnumber: request.body.DLnumber,
      phone: request.body.phone,
      email: request.body.email,
      location: request.body.location,
      date: request.body.date,
      time: request.body.time,
      truck: request.body.truck,
      transmission: request.body.transmission,
      permitExpiryDate: request.body.permitExpDate,
      checkboxOption: request.body.checkboxOption,
    });
    const savedAppointment = await newAppointment.save();

    return response.status(200).json({
      savedAppointment: savedAppointment,
      message: "Appointment added successfully.",
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      title: "server error",
      error: err.message,
    });
  }
});

// // Get all appointments
router.get("/api/appointments", async (request, response) => {
  try {
    const appointments = await appointment.find();
    response.json(appointments);
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
