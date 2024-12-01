const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { authorize } = require("../middlewares/authorize");
let { User } = require("../schemas/userSchemas");

// Register user
router.post("/register", async (req, res, next) => {
  try {
    console.log(req);
    const phone = req.body.phone;

    const existingUser = await User.findOne({
      $or: [{ phone: phone }],
    }).exec();

    if (existingUser) {
      return res.status(401).json({
        title: "Existing Email",
        message: "User already exists.",
      });
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      transmission: req.body.transmission,
      clas: req.body.clas,
      DOB: req.body.DOB,
      // DLnumber: bcrypt.hashSync(request.body.DLnumber, 10),
      DLnumber: req.body.DLnumber,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    const savedUser = await newUser.save();

    return res
      .status(200)
      .json({ savedUser: savedUser, message: "User added successfully." });
  } catch (err) {
    next(err);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const userExists = await User.findOne({ phone }).exec();

    if (!userExists) {
      return res.status(401).json({
        title: "User not found.",
        message: "Invalid credentials.",
      });
    }

    if (!bcrypt.compareSync(password, userExists.password)) {
      return res.status(401).json({
        title: "Login Failed.",
        message: "Invalid credentials.",
      });
    }

    let token = jwt.sign(
      { userId: userExists._id, role: userExists.Role },
      "secretkey",
      {
        expiresIn: "480min",
      }
    );

    return res.status(200).json({
      message: "Login success",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

// Get user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      user: foundUser,
    });
  } catch (err) {
    next(err);
  }
});

// Get all students
router.get(
  "/",
  authorize(["Instructor", "Manager"]),
  async (req, res, next) => {
    try {
      const students = await User.find({ Role: "Student" });

      if (!students || students.length === 0) {
        return res.status(404).json({
          message: "No students found.",
        });
      }

      return res.status(200).json({
        students: students,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Update student by ID
router.put("/", async (req, res) => {
  try {
    const studentId = req.body.id;
    const updatedData = req.body;

    const updatedStudent = await User.findByIdAndUpdate(
      studentId,
      updatedData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
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
});

// Delete student by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await User.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    return res.status(200).json({
      message: "Student deleted successfully.",
      student: deletedStudent,
    });
  } catch (err) {
    next(err);
  }
});

// Add new Student
router.post("/", async (req, res, next) => {
  try {
    const phone = req.body.phone;

    const existingUser = await User.findOne({
      $or: [{ phone: phone }],
    }).exec();

    if (existingUser) {
      return res.status(401).json({
        title: "Existing Email",
        message: "User already exists.",
      });
    }

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
    });

    const savedUser = await newUser.save();

    return res
      .status(200)
      .json({ savedUser: savedUser, message: "User added successfully." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
