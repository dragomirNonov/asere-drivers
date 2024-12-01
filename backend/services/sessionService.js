const { convertTimeStringToMinutes } = require("../utils/dateTimeUtils");

const calculateDuration = (clockedIn, clockedOut) => {
  const duration = (
    (convertTimeStringToMinutes(clockedOut) -
      convertTimeStringToMinutes(clockedIn)) /
    60
  ).toFixed(1);

  return duration;
};

const calculateSessionsTotalHours = (sessions) => {
  let preTrip = 0;
  let driving = 0;

  sessions.forEach((session) => {
    if (session.duration) {
      const duration = parseFloat(session.duration);
      if (session.maneuver === "Pre Trip") {
        preTrip += duration;
      } else if (
        ["Straight Back", "Off Set", "Road"].includes(session.maneuver)
      ) {
        driving += duration;
      }
    }
  });

  const total = preTrip + driving;

  return {
    preTrip: preTrip.toFixed(2),
    driving: driving.toFixed(2),
    total: total.toFixed(2),
  };
};

module.exports = {
  calculateDuration,
  calculateSessionsTotalHours,
};
