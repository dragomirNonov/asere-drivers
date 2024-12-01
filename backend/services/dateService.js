const convertToDateTime = (timeString) => {
  const [hour, minute] = timeString.split(":").map(Number);
  const combinedDate = new Date();
  combinedDate.setUTCHours(hour, minute, 0, 0);
  return combinedDate;
};

module.exports = {
  convertToDateTime,
};
