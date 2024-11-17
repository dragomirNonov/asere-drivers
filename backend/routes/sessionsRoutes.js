const express = require("express");
const router = express.Router();
let { sessions } = require("../schemas/sessionsSchema");

const userAuthentication = require("../services/userAuth");
let userAuth = userAuthentication.authUser;

// Clock IN
router.post("/api/clock-in", async (req, res) => {
  // Call authUser middleware with the desired role to check against
  userAuth(req, res, ["Instructor", "Manager", "Student"], async () => {
    try {
      const clockedIn = createDateFromTimeString(req.body.startTime);
      const clockedOut = createDateFromTimeString(req.body.endTime);
      const duration = calculateDuration(clockedIn, clockedOut);

      const session = new sessions({
        user: req.body.userId,
        date: req.body.date,
        clockedIn: req.body.startTime,
        clockedOut: req.body.endTime,
        maneuver: req.body.maneuver,
        duration: duration,
      });

      await session.save();
      res.send("Clocked in");
    } catch (err) {
      res.status(500).json({
        title: "Server error",
        error: err.message,
      });
    }
  });
});

// Edit
router.put("/api/session/:id", async (req, res) => {
  userAuth(req, res, ["Instructor", "Manager", "Student"], async () => {
    try {
      const clockedIn = createDateFromTimeString(req.body.clockedIn);
      const clockedOut = createDateFromTimeString(req.body.clockedOut);
      const duration = calculateDuration(clockedIn, clockedOut);

      const updatedSession = await sessions.findByIdAndUpdate(
        req.params.id,
        {
          date: req.body.date,
          clockedIn: req.body.clockedIn,
          clockedOut: req.body.clockedOut,
          maneuver: req.body.maneuver,
          duration: duration,
        },
        { new: true }
      );

      if (!updatedSession) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json({ message: "Session updated", session: updatedSession });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        title: "Server error",
        error: err.message,
      });
    }
  });
});

//#region ClockIn/ClockOut
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

//#endregion

// Get sessions by student ID
router.get("/api/sessions/:studentId", async (req, res) => {
  userAuth(req, res, ["Instructor", "Manager", "Student"], async () => {
    try {
      const { studentId } = req.params;
      let studentSessions = await sessions.find({ user: studentId });

      // Sort sessions by date, latest first
      studentSessions = studentSessions.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );

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

router.delete("/api/sessions/:sessionId", async (req, res) => {
  userAuth(req, res, ["Instructor", "Manager", "Student"], async () => {
    try {
      const { sessionId } = req.params;

      const deletedSession = await sessions.findByIdAndDelete(sessionId);

      // If session not found, return a 404 error
      if (!deletedSession) {
        return res.status(404).json({ message: "Session not found" });
      }

      res.json(deletedSession);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        title: "Server error",
        error: err.message,
      });
    }
  });
});

function createDateFromTimeString(timeString) {
  // Parse hours and minutes from the time string
  const [hour, minute] = timeString.split(":").map(Number);

  const date = new Date();
  date.setHours(hour, minute, 0, 0);

  return date;
}

function calculateDuration(clockedIn, clockedOut) {
  if (clockedIn >= clockedOut) {
    throw new Error(
      "clockedIn time cannot be greater than or equal to clockedOut time."
    );
  }
  const diffMs = clockedOut - clockedIn;
  const diffHours = diffMs / (1000 * 60 * 60);
  const roundedHours = Math.round(diffHours * 2) / 2;

  return roundedHours;
}

module.exports = router;
