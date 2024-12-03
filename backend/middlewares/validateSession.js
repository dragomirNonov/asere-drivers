const { Session } = require("../schemas/sessionsSchema.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { check, validationResult, body } = require("express-validator");

const {
  convertTimeStringToMinutes,
  getStartAndEndOfDay,
} = require("../utils/dateTimeUtils.js");

const validateSession = [
  check("userId").if(body("userId").exists()).notEmpty(),
  check("clockedIn").if(body("clockedIn").exists()).notEmpty(),
  check("clockedOut").if(body("clockedOut").exists()).notEmpty(),
  check("date").if(body("date").exists()).notEmpty(),
  check("maneuver").if(body("maneuver").exists()).notEmpty(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          title: "Validation Error",
          message: "Missing field values.",
          errors,
        });
      }

      const { userId, clockedIn, clockedOut, date } = req.body;

      if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
        return res.status(400).json({
          title: "Validation Error",
          message: "Invalid date format. Use `YYYY-MM-DD`.",
        });
      }

      const utcDate = dayjs(date).utc().toDate();

      // Extract start and end of the day
      const { startOfDay, endOfDay } = getStartAndEndOfDay(utcDate);

      const WORK_START_TIME = process.env.WORK_START_TIME || "09:00";
      const WORK_END_TIME = process.env.WORK_END_TIME || "17:00";

      const minTime = convertTimeStringToMinutes(WORK_START_TIME);
      const maxTime = convertTimeStringToMinutes(WORK_END_TIME);
      const newStartMinutes = convertTimeStringToMinutes(clockedIn);
      const newEndMinutes = convertTimeStringToMinutes(clockedOut);

      // Check if clocked-in and clocked-out times are within working hours
      if (newStartMinutes < minTime || newStartMinutes > maxTime) {
        return res.status(400).json({
          title: "Validation Error",
          message: `Clocked-in time must be between ${WORK_START_TIME} and ${WORK_END_TIME}. Provided time: ${clockedIn}`,
        });
      }

      if (newEndMinutes < minTime || newEndMinutes > maxTime) {
        return res.status(400).json({
          title: "Validation Error",
          message: `Clocked-out time must be between ${WORK_START_TIME} and ${WORK_END_TIME}. Provided time: ${clockedOut}`,
        });
      }

      // Ensure clocked-out time is after clocked-in time
      if (newEndMinutes <= newStartMinutes) {
        return res.status(400).json({
          title: "Validation Error",
          message: "Clocked-out time must be after clocked-in time.",
        });
      }

      // Fetch existing sessions for the same user and date range
      const existingSessions = await Session.find({
        user: userId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      // Check for time conflicts
      if (isTimeConflict(newStartMinutes, newEndMinutes, existingSessions)) {
        return res.status(400).json({
          title: "Validation Error",
          message: `Session between '${clockedIn}' and '${clockedOut}' already exist for date:'${dayjs(
            date
          ).format("MM/DD/YYYY")}'.`,
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  },
];

const isTimeConflict = (newStartMinutes, newEndMinutes, existingSessions) => {
  return existingSessions.some((session) => {
    const existingStartMinutes = convertTimeStringToMinutes(session.clockedIn);
    const existingEndMinutes = convertTimeStringToMinutes(session.clockedOut);

    return (
      (newStartMinutes >= existingStartMinutes &&
        newStartMinutes < existingEndMinutes) ||
      (newEndMinutes > existingStartMinutes &&
        newEndMinutes <= existingEndMinutes) ||
      (newStartMinutes <= existingStartMinutes &&
        newEndMinutes >= existingEndMinutes)
    );
  });
};

module.exports = validateSession;
