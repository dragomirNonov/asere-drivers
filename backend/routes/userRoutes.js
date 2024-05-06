const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const users = require("../data/usersData");
const userAuthentication = require("../services/userAuth");
let authUser = userAuthentication.authUser;
let { user } = require("../schemas/userSchemas");

// Register user
router.post("/api/register", async (request, response) => {
  try {
    const phone = request.body.phone;

    const existingUser = await user
      .findOne({
        $or: [{ phone: phone }],
      })
      .exec();
    if (existingUser) {
      return response.status(401).json({
        title: "Existing Email",
        message: "User already exists.",
      });
    }
    const newUser = new user({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phone: request.body.phone,
      email: request.body.email,
      transmission: request.body.transmission,
      clas: request.body.clas,
      // DLnumber: bcrypt.hashSync(request.body.DLnumber, 10),
      DLnumber: request.body.DLnumber,
      password: bcrypt.hashSync(request.body.password, 10),
    });
    const savedUser = await newUser.save();
    return response
      .status(200)
      .json({ savedUser: savedUser, message: "User added successfully." });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      title: "server error",
      error: err.message,
    });
  }
});

// LOGIN
router.post("/api/login", async (req, res) => {
  try {
    const userExists = await user.findOne({ phone: req.body.phone }).exec();

    if (!userExists) {
      return res.status(401).json({
        title: "User not found.",
        message: "Invalid credentials.",
      });
    }

    if (!bcrypt.compareSync(req.body.password, userExists.password)) {
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
    console.log(err);
    res.status(500).json({
      title: "server error",
      error: err.message,
    });
  }
});

// Get user by ID
router.post("/api/user", async (req, res) => {
  try {
    const userId = req.body.id;

    const foundUser = await user.findById(userId);

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      user: foundUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "Server error",
      error: err.message,
    });
  }
});

// Get all students
router.get("/api/students", (req, res) => {
  // Call authUser middleware with the desired role to check against
  authUser(req, res, "Manager", async () => {
    try {
      const students = await user.find({ Role: "Student" });

      if (!students || students.length === 0) {
        return res.status(404).json({
          message: "No students found.",
        });
      }

      return res.status(200).json({
        students: students,
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

// Update student by ID
router.put("/api/editstudent", async (req, res) => {
  try {
    const studentId = req.body.id;
    const updatedData = req.body;
    console.log(updatedData);

    const updatedStudent = await user.findByIdAndUpdate(
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
    console.log(err);
    res.status(500).json({
      title: "Server error",
      error: err.message,
    });
  }
});

// Delete student by ID
router.delete("/api/deletestudent/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await user.findByIdAndDelete(studentId);

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
    console.log(err);
    res.status(500).json({
      title: "Server error",
      error: err.message,
    });
  }
});

// Add new Student
router.post("/api/addstudent", async (request, response) => {
  try {
    const phone = request.body.phone;

    const existingUser = await user
      .findOne({
        $or: [{ phone: phone }],
      })
      .exec();
    if (existingUser) {
      return response.status(401).json({
        title: "Existing Email",
        message: "User already exists.",
      });
    }
    const newUser = new user({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phone: request.body.phone,
      email: request.body.email,
      transmission: request.body.transmission,
      clas: request.body.clas,
      DLnumber: request.body.DLnumber,
      DOB: request.body.DOB,
      permitExpiryDate: request.body.permitExpDate,
    });
    const savedUser = await newUser.save();
    return response
      .status(200)
      .json({ savedUser: savedUser, message: "User added successfully." });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      title: "server error",
      error: err.message,
    });
  }
});

module.exports = router;
