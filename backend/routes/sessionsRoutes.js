const express = require("express");
const router = express.Router();
const { authorize } = require("../middlewares/authorize");
const validateSession = require("../middlewares/validateSession");
const { check, validationResult } = require("express-validator");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { Session } = require("../schemas/sessionsSchema");
const {
  calculateDuration,
  calculateSessionsTotalHours,
} = require("../services/sessionService");

// Shared validation rules
const sessionValidationRules = [
  check("userId", "User ID is required.").notEmpty(),
  check("clockedIn", "ClockedIn time is required.").notEmpty(),
  check("clockedOut", "ClockedOut time is require.").notEmpty(),
  check("date", "Date is required.").notEmpty(),
  check("maneuver", "Maneuver is required.").notEmpty(),
];

// Create
router.post(
  "/",
  authorize(["Instructor", "Manager", "Student"]),
  sessionValidationRules,
  validateSession,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId, clockedIn, clockedOut, date, maneuver } = req.body;

      // Calculate duration
      const duration = calculateDuration(clockedIn, clockedOut);

      const utcDate = dayjs(date).utc().toDate();
      console.log(utcDate);

      // Create the session
      const session = new Session({
        user: userId,
        date: utcDate,
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
  "/:id",
  authorize(["Instructor", "Manager"]),
  sessionValidationRules,
  validateSession,
  async (req, res, next) => {
    try {
      const { userId, clockedIn, clockedOut, date, maneuver } = req.body;

      // Calculate duration
      const duration = calculateDuration(clockedIn, clockedOut);

      const utcDate = dayjs(date).utc().toDate();
      console.log(utcDate);

      const updatedSession = await Session.findByIdAndUpdate(
        req.params.id,
        {
          date: utcDate,
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
  "/:studentId",
  authorize(["Instructor", "Manager", "Student"]),
  async (req, res, next) => {
    try {
      const { studentId } = req.params;
      let studentSessions = await Session.find({ user: studentId });

      // Sort sessions by date, latest first
      studentSessions = studentSessions.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );

      const { preTrip, driving, total } =
        calculateSessionsTotalHours(studentSessions);

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
  "/:sessionId",
  authorize(["Instructor", "Manager"]),
  async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      console.log(sessionId);

      const deletedSession = await Session.findByIdAndDelete(sessionId);

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
