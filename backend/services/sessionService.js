const combineDateAndTime = (date, timeString) => {
  const [hour, minute] = timeString.split(":").map(Number);
  const combinedDate = new Date(date);
  combinedDate.setUTCHours(hour, minute, 0, 0);
  return combinedDate;
};

const hasTimeOverlap = (newClockedIn, newClockedOut, existingSessions) => {
  return existingSessions.some((session) => {
    const existingClockedIn = combineDateAndTime(
      session.date,
      session.clockedIn
    );
    const existingClockedOut = combineDateAndTime(
      session.date,
      session.clockedOut
    );

    return (
      (newClockedIn >= existingClockedIn &&
        newClockedIn < existingClockedOut) ||
      (newClockedOut > existingClockedIn &&
        newClockedOut <= existingClockedOut) ||
      (newClockedIn <= existingClockedIn && newClockedOut >= existingClockedOut)
    );
  });
};

function calculateDuration(clockedIn, clockedOut) {
  const diffMs = clockedOut - clockedIn;
  const diffHours = diffMs / (1000 * 60 * 60);
  const roundedHours = Math.round(diffHours * 2) / 2;

  return roundedHours;
}

function isWithinAllowedTime(clockedIn, clockedOut, date) {
  const allowedStart = combineDateAndTime(date, "09:00");
  const allowedEnd = combineDateAndTime(date, "17:00");

  return clockedIn >= allowedStart && clockedOut <= allowedEnd;
}

const calculateSessionTotalHours = (sessions) => {
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

// Add other utility functions as needed...
module.exports = {
  combineDateAndTime,
  hasTimeOverlap,
  calculateDuration,
  isWithinAllowedTime,
  calculateSessionTotalHours,
};
