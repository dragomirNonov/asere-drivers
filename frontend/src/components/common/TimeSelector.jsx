import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const TimeSelector = ({
  clockIn,
  clockOut,
  onClockInChange,
  onClockOutChange,
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    // Add 17:00 as the last slot
    slots.push('17:00');
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getNextAvailableTime = (selectedTime) => {
    const currentIndex = timeSlots.indexOf(selectedTime);
    return timeSlots[currentIndex + 1] || timeSlots[timeSlots.length - 1];
  };

  const handleClockInChange = (time) => {
    debugger;
    onClockInChange(time);
    if (clockOut && time >= clockOut) {
      onClockOutChange(getNextAvailableTime(time));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Clock In Select */}
      <TextField
        size="small"
        select
        fullWidth
        label="Start Time"
        value={clockIn || ''}
        onChange={(e) => handleClockInChange(e.target.value)}
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
        value={clockOut || ''}
        onChange={(e) => onClockOutChange(e.target.value)}
        variant="outlined"
        className="flex-1 bg-white"
        required
        disabled={!clockIn}>
        <MenuItem value="" disabled>
          End
        </MenuItem>
        {timeSlots.map((time) => (
          <MenuItem
            key={`out-${time}`}
            value={time}
            disabled={clockIn ? time <= clockIn : false}>
            {time}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default TimeSelector;
