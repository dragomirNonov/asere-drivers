import React from 'react';
import { TextField, MenuItem, FormHelperText } from '@mui/material';

const TimeSelector = ({
  clockedIn,
  clockedOut,
  onClockedInChange,
  onClockedOutChange,
  error,
  helperText,
}) => {
  // Convert 24-hour time to 12-hour AM/PM format
  const formatTimeDisplay = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  // Convert 12-hour AM/PM time back to 24-hour format
  const convertToMilitaryTime = (time) => {
    if (!time) return '';
    const [timeWithoutPeriod, period] = time.split(' ');
    let [hours, minutes] = timeWithoutPeriod.split(':');
    hours = parseInt(hours);
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    slots.push('17:00');
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getNextAvailableTime = (selectedTime) => {
    const currentIndex = timeSlots.indexOf(selectedTime);
    return timeSlots[currentIndex + 1] || timeSlots[timeSlots.length - 1];
  };

  const handleClockedInChange = (time) => {
    const militaryTime = convertToMilitaryTime(time);
    onClockedInChange(militaryTime);
    if (clockedOut && militaryTime >= clockedOut) {
      const nextTime = getNextAvailableTime(militaryTime);
      onClockedOutChange(nextTime);
    }
  };

  const handleClockedOutChange = (time) => {
    const militaryTime = convertToMilitaryTime(time);
    onClockedOutChange(militaryTime);
  };

  // Filter time slots based on selected start time
  const filteredEndTimeSlots = clockedIn
    ? timeSlots.filter((time) => time > clockedIn)
    : timeSlots;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap items-center gap-4">
        {/* Clock In Select */}
        <TextField
          size="small"
          select
          fullWidth
          label="Start Time"
          value={clockedIn ? formatTimeDisplay(clockedIn) : ''}
          onChange={(e) => handleClockedInChange(e.target.value)}
          variant="outlined"
          className="md:flex-1 bg-white"
          error={error}>
          <MenuItem value="" disabled>
            Start
          </MenuItem>
          {timeSlots.map((time) => (
            <MenuItem key={`in-${time}`} value={formatTimeDisplay(time)}>
              {formatTimeDisplay(time)}
            </MenuItem>
          ))}
        </TextField>

        {/* Clock Out Select */}
        <TextField
          size="small"
          select
          fullWidth
          label="End Time"
          value={clockedOut ? formatTimeDisplay(clockedOut) : ''}
          onChange={(e) => handleClockedOutChange(e.target.value)}
          variant="outlined"
          className="md:flex-1 bg-white"
          disabled={!clockedIn}
          error={error}>
          <MenuItem value="" disabled>
            End
          </MenuItem>
          {filteredEndTimeSlots.map((time) => (
            <MenuItem key={`out-${time}`} value={formatTimeDisplay(time)}>
              {formatTimeDisplay(time)}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {error && helperText && (
        <FormHelperText error className="px-2 mt-1">
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};

export default TimeSelector;
