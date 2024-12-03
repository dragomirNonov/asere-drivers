export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}-${day}-${year}`;
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

export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digits first
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Return original if it doesn't match the expected format
  return phoneNumber;
};

export const decodeToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const formatTimeToAmPm = (militaryTime) => {
  if (!militaryTime) return '';
  const [hours, minutes] = militaryTime.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return militaryTime;
  let period = 'AM';
  let formattedHours = hours;
  if (hours >= 12) {
    period = 'PM';
    formattedHours = hours === 12 ? 12 : hours - 12;
  }
  if (hours === 0) {
    formattedHours = 12;
  }
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${period}`;
};
