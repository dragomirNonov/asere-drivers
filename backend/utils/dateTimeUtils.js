const convertTimeStringToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const getStartAndEndOfDay = (date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  return { startOfDay, endOfDay };
};

module.exports = {
  convertTimeStringToMinutes,
  getStartAndEndOfDay,
};
