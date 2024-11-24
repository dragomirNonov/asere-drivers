const TimePicker = ({ value, name, onChange }) => {
  const times = [];
  const formatTime = (hour, minute) => {
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')}`;
  };

  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Stop adding times past 5:00 PM
      if (hour === 17 && minute > 0) break;

      const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      times.push({
        display: formatTime(hour, minute),
        value: timeValue,
      });
    }
  }

  return (
    <select name={name} value={value} onChange={onChange} className="w-3/8 p-1">
      <option value="">Time</option>
      {times.map((time) => (
        <option key={time.value} value={time.value}>
          {time.display}
        </option>
      ))}
    </select>
  );
};

export default TimePicker;
