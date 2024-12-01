const express = require("express");
const router = express.Router();
let { Appointment } = require("../schemas/appointmentsSchema");
const { authorize } = require("../middlewares/authorize");

const validateAppointment = require("../middlewares/validateAppointment");

// Create
router.post(
  "/",
  authorize(["Manager"]),
  validateAppointment,
  async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        DOB,
        DLnumber,
        phone,
        email,
        location,
        date,
        time,
        truck,
        transmission,
        permitExpDate,
        checkboxOption,
      } = req.body;

      // Check if an appointment with the same DLnumber already exists
      const existingAppointment = await Appointment.findOne({
        DLnumber: req.body.DLnumber,
      });

      if (existingAppointment) {
        return res.status(400).json({
          title: "Appointment exists.",
          message: "Appointment with that Driver's License already exists.",
        });
      }

      const newAppointment = new Appointment({
        firstName: firstName,
        lastName: lastName,
        DOB: DOB,
        DLnumber: DLnumber,
        phone: phone,
        email: email,
        location: location,
        date: date,
        time: time,
        truck: truck,
        transmission: transmission,
        permitExpiryDate: permitExpDate,
        checkboxOption: checkboxOption,
      });

      const savedAppointment = await newAppointment.save();

      return res.status(200).json({
        savedAppointment: savedAppointment,
        message: "Appointment added successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Update
router.put(
  "/:id",
  authorize(["Manager"]),
  validateAppointment,
  async (req, res, next) => {
    try {
      const appointmentId = req.params.id;

      const {
        firstName,
        lastName,
        DOB,
        DLnumber,
        phone,
        email,
        location,
        date,
        time,
        truck,
        transmission,
        permitExpDate,
        checkboxOption,
      } = req.body;

      // Find the appointment by ID
      const existingAppointment = await Appointment.findById(appointmentId);

      // Check if the appointment exists
      if (!existingAppointment) {
        return res.status(404).json({
          message: "Appointment not found.",
        });
      }

      // Update appointment fields
      existingAppointment.firstName = firstName;
      existingAppointment.lastName = lastName;
      existingAppointment.DOB = DOB;
      existingAppointment.DLnumber = DLnumber;
      existingAppointment.phone = phone;
      existingAppointment.email = email;
      existingAppointment.location = location;
      existingAppointment.date = date;
      existingAppointment.time = time;
      existingAppointment.truck = truck;
      existingAppointment.transmission = transmission;
      existingAppointment.permitExpiryDate = permitExpDate;
      existingAppointment.checkboxOption = checkboxOption;

      // Save the updated appointment
      const updatedAppointment = await existingAppointment.save();

      return res.status(200).json({
        updatedAppointment: updatedAppointment,
        message: "Appointment updated successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Read
router.get(
  "/",
  authorize(["Instructor", "Manager"]),
  async (req, res, next) => {
    try {
      const appointments = await Appointment.find();
      console.log(appointments);
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  }
);

// Get all real appointments
router.get(
  "/real",
  authorize(["Instructor", "Manager"]),
  async (req, res, next) => {
    try {
      // Fetch appointments where checkboxOption is "real"
      const appointments = await Appointment.find({ checkboxOption: "real" });
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  }
);

// Deleting an existing appointment
router.delete("/:id", authorize(["Manager"]), async (req, res, next) => {
  try {
    const appointmentId = req.params.id;

    // Delete the appointment by ID
    const deletedAppointment = await Appointment.deleteOne({
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
    next(err);
  }
});

module.exports = router;
