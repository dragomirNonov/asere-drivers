const express = require("express");
const router = express.Router();
let { sessions } = require("../schemas/sessionsSchema");
const { authorize } = require("../middlewares/authMiddleware");
const {
  combineDateAndTime,
  hasTimeOverlap,
  calculateDuration,
  isWithinAllowedTime,
  calculateSessionTotalHours,
} = require("../services/sessionService");

// // Clock IN
// router.post(
//   "/api/clock-in",
//   authorize(["Instructor", "Manager", "Student"]),
//   async (req, res, next) => {
//     try {
//       const { userId, clockedIn, clockedOut, date, maneuver } = req.body;

//       const clockedInDateTime = combineDateAndTime(date, clockedIn);
//       const clockedOutDateTime = combineDateAndTime(date, clockedOut);

//       if (clockedInDateTime >= clockedOutDateTime) {
//         return res.status(400).json({
//           message: "Invalid time: Start time must be before end time.",
//         });
//       }

//       // Validate time range
//       if (!isWithinAllowedTime(clockedInDateTime, clockedOutDateTime, date)) {
//         return res.status(400).json({
//           message:
//             "Invalid time: Appointments must be between 09:00 and 17:00.",
//         });
//       }

//       // Fetch existing sessions for the day
//       const existingSessions = await sessions.find({
//         user: userId,
//         date: new Date(date),
//       });

//       // Check for time overlap
//       if (
//         hasTimeOverlap(clockedInDateTime, clockedOutDateTime, existingSessions)
//       ) {
//         return res.status(400).json({
//           message:
//             "Time conflict: Overlapping session exists for the same day.",
//         });
//       }

//       const duration = calculateDuration(clockedInDateTime, clockedOutDateTime);

//       const session = new sessions({
//         user: userId,
//         date: date,
//         clockedIn: clockedIn,
//         clockedOut: clockedOut,
//         maneuver: maneuver,
//         duration: duration,
//       });

//       await session.save();
//       res.send("Clocked in");
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// Clock IN
router.post(
  "/api/clock-in",
  authorize(["Instructor", "Manager", "Student"]),
  async (req, res, next) => {
    try {
      const { userId, clockedIn, clockedOut, date, maneuver } = req.body;

      // Convert date string to start and end of day
      const sessionDate = new Date(date);
      const startOfDay = new Date(sessionDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(sessionDate.setHours(23, 59, 59, 999));

      // Find sessions for the same user on the same day
      const existingSessions = await sessions.find({
        user: userId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      // Convert times to minutes for easier comparison
      const getMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const newStartMinutes = getMinutes(clockedIn);
      const newEndMinutes = getMinutes(clockedOut);

      // Check for overlap
      const hasOverlap = existingSessions.some((session) => {
        const existingStartMinutes = getMinutes(session.clockedIn);
        const existingEndMinutes = getMinutes(session.clockedOut);

        const overlap =
          (newStartMinutes >= existingStartMinutes &&
            newStartMinutes < existingEndMinutes) ||
          (newEndMinutes > existingStartMinutes &&
            newEndMinutes <= existingEndMinutes) ||
          (newStartMinutes <= existingStartMinutes &&
            newEndMinutes >= existingEndMinutes);

        return overlap;
      });

      if (hasOverlap) {
        return res.status(400).json({
          message: "Time conflict.",
        });
      }

      // Calculate duration
      const duration = (
        (getMinutes(clockedOut) - getMinutes(clockedIn)) /
        60
      ).toFixed(1);

      // Create the session
      const session = new sessions({
        user: userId,
        date,
        clockedIn,
        clockedOut,
        maneuver,
        duration,
      });

      await session.save();
      res.status(200).json({
        message: "Session created successfully",
        session,
      });
    } catch (err) {
      console.error("Error creating session:", err);
      next(err);
    }
  }
);

// Edit
router.put(
  "/api/session/:id",
  authorize(["Instructor", "Manager"]),
  async (req, res, next) => {
    try {
      const { date, clockedIn, clockedOut, maneuver, userId } = req.body;

      const clockedInDateTime = combineDateAndTime(date, clockedIn);
      const clockedOutDateTime = combineDateAndTime(date, clockedOut);

      const duration = calculateDuration(clockedInDateTime, clockedOutDateTime);

      if (clockedInDateTime >= clockedOutDateTime) {
        return res.status(400).json({
          message: "Invalid time: Start time must be before end time.",
        });
      }
      if (!isWithinAllowedTime(clockedInDateTime, clockedOutDateTime, date)) {
        return res.status(400).json({
          message:
            "Invalid time: Appointments must be between 08:00 and 17:00.",
        });
      }
      const existingSessions = await sessions.find({
        user: userId,
        date: new Date(date),
      });
      if (
        hasTimeOverlap(clockedInDateTime, clockedOutDateTime, existingSessions)
      ) {
        return res.status(400).json({
          message:
            "Time conflict: Overlapping session exists for the same day.",
        });
      }
      const updatedSession = await sessions.findByIdAndUpdate(
        req.params.id,
        {
          date: date,
          clockedIn: clockedIn,
          clockedOut: clockedOut,
          maneuver: maneuver,
          duration: duration,
        },
        { new: true }
      );

      if (!updatedSession) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json({ message: "Session updated", session: updatedSession });
    } catch (err) {
      next(err);
    }
  }
);

// Get sessions by student ID
router.get(
  "/api/sessions/:studentId",
  authorize(["Instructor", "Manager", "Student"]),
  async (req, res) => {
    try {
      const { studentId } = req.params;
      let studentSessions = await sessions.find({ user: studentId });

      // Sort sessions by date, latest first
      studentSessions = studentSessions.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );

      const { preTrip, driving, total } =
        calculateSessionTotalHours(studentSessions);

      res.json({
        sessions: studentSessions,
        totalHours: {
          preTrip,
          driving,
          total,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/api/sessions/:sessionId",
  authorize(["Instructor", "Manager"]),
  async (req, res) => {
    try {
      const { sessionId } = req.params;
      console.log(sessionId);

      const deletedSession = await sessions.findByIdAndDelete(sessionId);

      if (!deletedSession) {
        return res.status(404).json({ message: "Session not found." });
      }

      res.json(deletedSession);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
