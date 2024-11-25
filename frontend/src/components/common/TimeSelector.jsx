import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const TimeSelector = ({
  clockIn,
  clockOut,
  onClockInChange,
  onClockOutChange,
  showLabels = true,
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
    onClockInChange(time);
    if (clockOut && time >= clockOut) {
      onClockOutChange(getNextAvailableTime(time));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Clock In Select */}
      <div className="flex flex-col flex-1">
        {showLabels && (
          <label className="text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
        )}
        <select
          value={clockIn}
          onChange={(e) => handleClockInChange(e.target.value)}
          size={1}
          style={{ maxHeight: '50px', overflowY: 'auto' }}
          className="border border-gray-300 rounded-md p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required>
          <option value="">Start</option>
          {timeSlots.map((time) => (
            <option key={`in-${time}`} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Clock Out Select */}
      <div className="flex flex-col flex-1">
        {showLabels && (
          <label className="text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
        )}
        <select
          value={clockOut}
          size={1}
          onChange={(e) => onClockOutChange(e.target.value)}
          style={{ maxHeight: '50px', overflowY: 'auto' }}
          className="border border-gray-300 rounded-md p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={!clockIn}>
          <option value="">End</option>
          {timeSlots.map((time) => (
            <option key={`out-${time}`} value={time} disabled={time <= clockIn}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeSelector;
