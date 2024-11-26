import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const TimeSelector = ({
  clockedIn,
  clockedOut,
  onClockedInChange,
  onClockedOutChange,
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    // 9 AM to 12 PM (Noon)
    for (let hour = 9; hour <= 11; hour++) {
      const formattedHour = hour % 12 || 12;
      slots.push(`${formattedHour}:00 AM`);
      slots.push(`${formattedHour}:30 AM`);
    }

    // 12 PM (Noon)
    slots.push('12:00 PM');
    slots.push('12:30 PM');

    // 1 PM to 5 PM
    for (let hour = 1; hour <= 5; hour++) {
      slots.push(`${hour}:00 PM`);
      if (hour < 5) {
        slots.push(`${hour}:30 PM`);
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getNextAvailableTime = (selectedTime) => {
    const currentIndex = timeSlots.indexOf(selectedTime);
    return timeSlots[currentIndex + 1] || timeSlots[timeSlots.length - 1];
  };

  const handleClockedInChange = (time) => {
    onClockedInChange(time);
    if (clockedOut && compareTime(time, clockedOut) >= 0) {
      onClockedOutChange(getNextAvailableTime(time));
    }
  };

  // Helper function to compare times
  const compareTime = (time1, time2) => {
    const convertTo24Hour = (time) => {
      const [timeStr, period] = time.split(' ');
      let [hours, minutes] = timeStr.split(':').map(Number);

      if (period === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (period === 'AM' && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes;
    };

    return convertTo24Hour(time1) - convertTo24Hour(time2);
  };

  // Filter end time slots based on selected start time
  const filteredEndTimeSlots = clockedIn
    ? timeSlots.filter((time) => compareTime(time, clockedIn) > 0)
    : timeSlots;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Clock In Select */}
      <TextField
        size="small"
        select
        fullWidth
        label="Start Time"
        value={clockedIn}
        onChange={(e) => handleClockedInChange(e.target.value)}
        variant="outlined"
        className="flex-1 bg-white"
        required>
        <MenuItem value="" disabled>
          Start
        </MenuItem>
        {timeSlots.map((time) => (
          <MenuItem key={`in-${time}`} value={time}>
            {time}
          </MenuItem>
        ))}
      </TextField>

      {/* Clock Out Select */}
      <TextField
        size="small"
        select
        fullWidth
        label="End Time"
        value={clockedOut}
        onChange={(e) => onClockedOutChange(e.target.value)}
        variant="outlined"
        className="flex-1 bg-white"
        required
        disabled={!clockedIn}>
        <MenuItem value="" disabled>
          End
        </MenuItem>
        {filteredEndTimeSlots.map((time) => (
          <MenuItem key={`out-${time}`} value={time}>
            {time}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default TimeSelector;
