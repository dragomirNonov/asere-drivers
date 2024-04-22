const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const users = require("../data/usersData");
// const userAuthentication = require("../services/basicAuth");
// let authUser = userAuthentication.authUser;
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
      DLnumber: bcrypt.hashSync(request.body.DLnumber, 10),
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
        message: "Invalid Password.",
      });
    }

    let token = jwt.sign({ userId: userExists._id }, "secretkey", {
      expiresIn: "30min",
    });

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

module.exports = router;
