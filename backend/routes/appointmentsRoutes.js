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

// Editing an existing appointment
router.put("/api/editappointment", async (request, response) => {
  try {
    const appointmentId = request.body.id;

    // Find the appointment by ID
    const existingAppointment = await appointment.findById(appointmentId);

    // Check if the appointment exists
    if (!existingAppointment) {
      return response.status(404).json({
        message: "Appointment not found.",
      });
    }

    // Update appointment fields
    existingAppointment.firstName = request.body.firstName;
    existingAppointment.lastName = request.body.lastName;
    existingAppointment.DOB = request.body.DOB;
    existingAppointment.DLnumber = request.body.DLnumber;
    existingAppointment.phone = request.body.phone;
    existingAppointment.email = request.body.email;
    existingAppointment.location = request.body.location;
    existingAppointment.date = request.body.date;
    existingAppointment.time = request.body.time;
    existingAppointment.truck = request.body.truck;
    existingAppointment.transmission = request.body.transmission;
    existingAppointment.permitExpiryDate = request.body.permitExpiryDate;
    existingAppointment.checkboxOption = request.body.checkboxOption;

    // Save the updated appointment
    const updatedAppointment = await existingAppointment.save();

    return response.status(200).json({
      updatedAppointment: updatedAppointment,
      message: "Appointment updated successfully.",
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      title: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;
