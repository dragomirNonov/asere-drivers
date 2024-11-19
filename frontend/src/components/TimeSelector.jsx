import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

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
    onClockInChange(time);
    if (clockOut && time >= clockOut) {
      onClockOutChange(getNextAvailableTime(time));
    }
  };

  return (
    <div className="max-w-full overflow-x-auto scrollbar-thin">
      <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-white rounded-lg shadow-sm p-2 min-w-max">
        <select
          value={clockIn}
          onChange={(e) => handleClockInChange(e.target.value)}
          className="px-1 py-1.5 rounded border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer hover:border-gray-300"
          required>
          <option value="">Start</option>
          {timeSlots.map((time) => (
            <option key={`in-${time}`} value={time}>
              {time}
            </option>
          ))}
        </select>
        <FontAwesomeIcon icon={faClock} color="darkblue" />
        <select
          value={clockOut}
          onChange={(e) => onClockOutChange(e.target.value)}
          className="px-1 py-1.5 rounded border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:text-gray-400 appearance-none cursor-pointer hover:border-gray-300"
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
