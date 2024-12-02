const express = require("express");
const router = express.Router();
const { authorize } = require("../middlewares/authorize");
const validateSession = require("../middlewares/validateSession");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { Session } = require("../schemas/sessionsSchema");
const {
  calculateDuration,
  calculateSessionsTotalHours,
} = require("../services/sessionService");

// Create
router.post(
  "/",
  authorize(["Instructor", "Manager", "Student"]),
  validateSession,
  async (req, res, next) => {
    try {
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
        message: "Session added successfully.",
        session,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Edit
router.put(
  "/:id",
  authorize(["Instructor", "Manager"]),
  validateSession,
  async (req, res, next) => {
    try {
      const { userId, clockedIn, clockedOut, date, maneuver } = req.body;

      // Calculate duration
      const duration = calculateDuration(clockedIn, clockedOut);

      const utcDate = dayjs(date).utc().toDate();

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
        return res
          .status(404)
          .json({ title: "Not found", error: "Session not found" });
      }

      res.status(200).json({
        message: "Session edited successfully.",
        session: updatedSession,
      });
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

      res.status(200).json({
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
        return res
          .status(404)
          .json({ title: "Not Found", message: "Session not found." });
      }

      res.status(200).json({
        message: "Session deleted successfully",
        session: deletedSession,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
