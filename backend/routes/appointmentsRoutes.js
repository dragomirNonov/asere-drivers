const express = require("express");
const router = express.Router();
let { appointment } = require("../schemas/appointmentsSchema");

const userAuthentication = require("../services/userAuth");
let userAuth = userAuthentication.authUser;

// Addind new appointment
router.post("/api/newappointment", (req, res) => {
  // Call authUser middleware with the desired role to check against
  userAuth(req, res, "Manager", async () => {
    try {
      const newAppointment = new appointment({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DOB: req.body.DOB,
        DLnumber: req.body.DLnumber,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        truck: req.body.truck,
        transmission: req.body.transmission,
        permitExpiryDate: req.body.permitExpDate,
        checkboxOption: req.body.checkboxOption,
      });
      const savedAppointment = await newAppointment.save();

      return res.status(200).json({
        savedAppointment: savedAppointment,
        message: "Appointment added successfully.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        title: "Server error",
        error: err.message,
      });
    }
  });
});

// Get all appointments
router.get("/api/appointments", (req, res) => {
  // Call authUser middleware with the desired role to check against
  userAuth(req, res, "Manager", async () => {
    try {
      const appointments = await appointment.find();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });
});

// Editing an existing appointment
router.put("/api/editappointment", (req, res) => {
  // Call authUser middleware with the desired role to check against
  userAuth(req, res, "Manager", async () => {
    try {
      const appointmentId = req.body.id;

      // Find the appointment by ID
      const existingAppointment = await appointment.findById(appointmentId);

      // Check if the appointment exists
      if (!existingAppointment) {
        return res.status(404).json({
          message: "Appointment not found.",
        });
      }

      // Update appointment fields
      existingAppointment.firstName = req.body.firstName;
      existingAppointment.lastName = req.body.lastName;
      existingAppointment.DOB = req.body.DOB;
      existingAppointment.DLnumber = req.body.DLnumber;
      existingAppointment.phone = req.body.phone;
      existingAppointment.email = req.body.email;
      existingAppointment.location = req.body.location;
      existingAppointment.date = req.body.date;
      existingAppointment.time = req.body.time;
      existingAppointment.truck = req.body.truck;
      existingAppointment.transmission = req.body.transmission;
      existingAppointment.permitExpiryDate = req.body.permitExpiryDate;
      existingAppointment.checkboxOption = req.body.checkboxOption;

      // Save the updated appointment
      const updatedAppointment = await existingAppointment.save();

      return res.status(200).json({
        updatedAppointment: updatedAppointment,
        message: "Appointment updated successfully.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        title: "Server error",
        error: err.message,
      });
    }
  });
});

// Deleting an existing appointment
router.delete("/api/deleteappointment/:id", (req, res) => {
  // Call authUser middleware with the desired role to check against
  userAuth(req, res, "Manager", async () => {
    try {
      const appointmentId = req.params.id;

      // Delete the appointment by ID
      const deletedAppointment = await appointment.deleteOne({
        _id: appointmentId,
      });

      // Check if the appointment was deleted
      if (deletedAppointment.deletedCount === 0) {
        return res.status(404).json({
          message: "Appointment not found.",
        });
      }

      return res.status(200).json({
        message: "Appointment deleted successfully.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        title: "Server error",
        error: err.message,
      });
    }
  });
});

module.exports = router;
