const { Session } = require("../schemas/sessionsSchema.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { check, validationResult } = require("express-validator");

const validateAppointment = [
  // Validation rules
  check("firstName", "First name is required.").notEmpty(),
  check("lastName", "Last name is required.").notEmpty(),
  check("DOB", "Date of birth is required.").notEmpty(),
  check("DLnumber", "Driver's License Number is required.").notEmpty(),
  check("phone", "Phone number is required.").notEmpty(),
  check("email", "Email is required.").notEmpty(),
  check("location", "Location is required.").notEmpty(),
  check("date", "Date is required.").notEmpty(),
  check("time", "Time is required.").notEmpty(),
  check("truck", "Truck is required.").notEmpty(),
  check("transmission", "Transmission is required.").notEmpty(),
  check("permitExpDate", "Permit Expiry Date is required.").notEmpty(),
  check("checkboxOption", "Appointment type is required.").notEmpty(),

  // Custom validation logic
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Missing field values." });
      }

      const { date } = req.body;

      if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Use `YYYY-MM-DD`." });
      }

      // Additional custom validations can go here...

      next();
    } catch (err) {
      console.error("Error validating appointment:", err);
      next(err);
    }
  },
];

module.exports = validateAppointment;
