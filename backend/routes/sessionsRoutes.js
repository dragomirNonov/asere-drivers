const express = require("express");
const router = express.Router();
let { sessions } = require("../schemas/sessionsSchema");

const userAuthentication = require("../services/userAuth");
let userAuth = userAuthentication.authUser;

// Clock IN
router.post("/api/clock-in", async (req, res) => {
  // Call authUser middleware with the desired role to check against
  userAuth(req, res, "Student", async () => {
    try {
      const session = new sessions({
        user: req.body.userId,
        date: req.body.date,
        clockedIn: req.body.startTime,
        clockedOut: req.body.endTime,
        maneuver: req.body.maneuver,
        duration: req.body.duration,
      });
      await session.save();
      res.send("Clocked in");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        title: "Server error",
        error: err.message,
      });
    }
  });
});

// // Clock IN
// router.post("/api/clock-i", async (req, res) => {
//   // Call authUser middleware with the desired role to check against
//   userAuth(req, res, "Student", async () => {
//     try {
//       const session = new sessions({
//         user: req.body.userId,
//         clockedIn: new Date(),
//       });
//       await session.save();
//       res.send("Clocked in");
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         title: "Server error",
//         error: err.message,
//       });
//     }
//   });
// });

// // Clock out
// router.post("/api/clock-out", async (req, res) => {
//   const session = await sessions
//     .findOne({ user: req.body.userId })
//     .sort({ clockedIn: -1 });
//   if (!session || session.clockedOut) {
//     return res.status(400).send("No active clock-in found");
//   }
//   session.clockedOut = new Date();
//   await session.save();
//   res.send("Clocked out");
// });

// Get sessions by student ID
router.get("/api/sessions/:studentId", async (req, res) => {
  // Call authUser middleware with the desired role to check against
  userAuth(req, res, ["Instructor", "Manager", "Student"], async () => {
    try {
      const studentId = req.params.studentId;
      const studentSessions = await sessions.find({ user: studentId });
      res.json(studentSessions);
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
