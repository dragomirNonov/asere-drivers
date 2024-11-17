export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${month}/${day}/${year}`;
};

// Function to format time from 24-hour to 12-hour AM/PM format
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number); // Convert hours to number
  let period = 'AM'; // Default to AM
  let formattedHours = hours;

  if (hours === 0) {
    // Midnight case
    formattedHours = 12;
  } else if (hours === 12) {
    // Noon case
    period = 'PM';
  } else if (hours > 12) {
    // PM case
    formattedHours = hours - 12;
    period = 'PM';
  }

  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};
