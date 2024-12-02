const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { authorize } = require("../middlewares/authorize");
let { User } = require("../schemas/userSchemas");
const {
  validateUser,
  userValidationRules,
  registrationValidationRules,
  loginValidationRules,
} = require("../middlewares/validateUser");

// Register user
router.post(
  "/register",
  registrationValidationRules,
  validateUser,
  async (req, res, next) => {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        transmission: req.body.transmission,
        clas: req.body.clas,
        DOB: req.body.DOB,
        DLnumber: req.body.DLnumber,
        password: bcrypt.hashSync(req.body.password, 10),
      });

      const savedUser = await newUser.save();
      return res.status(200).json({
        message: "User registered successfully.",
        user: savedUser,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Login
router.post("/login", loginValidationRules, async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const userExists = await User.findOne({ phone }).exec();
    if (!userExists) {
      return res.status(401).json({
        title: "Login Failed",
        message: "Invalid credentials",
      });
    }

    if (!bcrypt.compareSync(password, userExists.password)) {
      return res.status(401).json({
        title: "Login Failed",
        message: "Invalid credentials",
      });
    }

    let token = jwt.sign(
      { userId: userExists._id, role: userExists.Role },
      "secretkey",
      { expiresIn: "480min" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

// Get user by ID
router.get(
  "/:id",
  authorize(["Instructor", "Manager", "Student"]),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const foundUser = await User.findById(userId);

      if (!foundUser) {
        return res.status(404).json({
          title: "Validation error",
          message: "User not found",
        });
      }

      return res.status(200).json({
        user: foundUser,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Get all students
router.get(
  "/",
  authorize(["Instructor", "Manager"]),
  async (req, res, next) => {
    try {
      const students = await User.find({ Role: "Student" });

      return res.status(200).json({ students });
    } catch (err) {
      next(err);
    }
  }
);

// Update student
router.put(
  "/:id",
  authorize(["Manager"]),
  userValidationRules,
  validateUser,
  async (req, res, next) => {
    try {
      const updatedStudent = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedStudent) {
        return res.status(404).json({
          title: "Not found",
          message: "Student not found.",
        });
      }

      return res.status(200).json({
        message: "Student updated successfully.",
        student: updatedStudent,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Delete student
router.delete("/:id", authorize(["Manager"]), async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await User.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        title: "Not found",
        message: "Student not found.",
      });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (err) {
    next(err);
  }
});

// Add new Student
router.post(
  "/",
  authorize(["Manager"]),
  userValidationRules,
  validateUser,
  async (req, res, next) => {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        transmission: req.body.transmission,
        clas: req.body.clas,
        DLnumber: req.body.DLnumber,
        DOB: req.body.DOB,
        permitExpiryDate: req.body.permitExpDate,
        Role: "Student",
      });

      const savedUser = await newUser.save();
      return res.status(200).json({
        message: "Student added successfully",
        user: savedUser,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
