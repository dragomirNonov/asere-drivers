const { User } = require("../schemas/userSchemas");
const { check, validationResult } = require("express-validator");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// Shared validation rules for registration and adding students
const userValidationRules = [
  check("firstName", "First name is required").notEmpty(),
  check("lastName", "Last name is required").notEmpty(),
  check("phone", "Phone number is required")
    .notEmpty()
    .withMessage("Invalid phone number format"),
  check("email", "Valid email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email format"),
  check("DOB", "Date of birth is required").notEmpty(),
  check("DLnumber", "Driver's license number is required")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Driver's license number must be at least 5 characters"),
  check("transmission", "Transmission type is required")
    .notEmpty()
    .withMessage("Invalid transmission type"),
  check("clas", "Class type is required").notEmpty(),
];

// Additional validation rules for registration
const registrationValidationRules = [
  ...userValidationRules,
  check("password", "Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Login validation rules
const loginValidationRules = [
  check("phone", "Phone number is required").notEmpty(),
  check("password", "Password is required").notEmpty(),
];

// Validation middleware
const validateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        title: "Validation Error",
        errors: errors.array(),
      });
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ phone: req.body.phone });
    if (
      existingPhone &&
      (!req.params.id || req.params.id !== existingPhone._id.toString())
    ) {
      return res.status(400).json({
        title: "Validation Error",
        message: "Phone number already registered",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: req.body.email });
    if (
      existingEmail &&
      (!req.params.id || req.params.id !== existingEmail._id.toString())
    ) {
      return res.status(400).json({
        title: "Validation Error",
        message: "Email already registered",
      });
    }

    // Check if DL number already exists
    const existingDL = await User.findOne({ DLnumber: req.body.DLnumber });
    if (
      existingDL &&
      (!req.params.id || req.params.id !== existingDL._id.toString())
    ) {
      return res.status(400).json({
        title: "Validation Error",
        message: "Driver's license number already registered",
      });
    }

    // Validate permit expiry date if provided
    if (req.body.permitExpiryDate) {
      if (!dayjs(req.body.permitExpiryDate, "YYYY-MM-DD", true).isValid()) {
        return res.status(400).json({
          title: "Validation Error",
          message: "Invalid permit expiry date format. Use YYYY-MM-DD",
        });
      }
    }

    next();
  } catch (err) {
    console.error("Error validating user:", err);
    next(err);
  }
};

module.exports = {
  validateUser,
  userValidationRules,
  registrationValidationRules,
  loginValidationRules,
};
