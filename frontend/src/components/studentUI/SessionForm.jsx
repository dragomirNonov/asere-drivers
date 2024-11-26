import { useState } from 'react';
import toast from 'react-hot-toast';
import TimeSelector from '../common/TimeSelector';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField, MenuItem } from '@mui/material';

import sessionService from '../../services/sessions';

const SessionForm = ({ userId, onAddSession }) => {
  const today = dayjs();
  const initialFormData = {
    date: today,
    clockedIn: '',
    clockedOut: '',
    maneuver: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionObj = {
      userId: userId,
      date: formData.date.format('YYYY-MM-DD'),
      clockedIn: formData.clockedIn,
      clockedOut: formData.clockedOut,
      maneuver: formData.maneuver,
    };

    try {
      await sessionService.createSession(sessionObj);
      toast.success('You have Clocked-In');
      setFormData(initialFormData);
      onAddSession();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mb-2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Time Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <DatePicker
              label="Select Date"
              value={formData.date}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  variant: 'outlined',
                  className:
                    'border border-gray-300 rounded-md text-gray-800 bg-white',
                },
              }}
            />
          </div>

          <div className="w-full">
            <TimeSelector
              clockedIn={formData.clockedIn}
              clockedOut={formData.clockedOut}
              onClockedInChange={(value) =>
                handleTimeChange('clockedIn', value)
              }
              onClockedOutChange={(value) =>
                handleTimeChange('clockedOut', value)
              }
            />
          </div>

          <TextField
            select
            fullWidth
            label="Maneuver"
            name="maneuver"
            value={formData.maneuver || ''}
            onChange={handleChange}
            variant="outlined"
            required
            className="bg-white"
            size="small">
            <MenuItem value="" disabled>
              Select Maneuver
            </MenuItem>
            <MenuItem value="Pre Trip">Pre Trip</MenuItem>
            <MenuItem value="Straight Back">Straight Back</MenuItem>
            <MenuItem value="Off Set">Off Set</MenuItem>
            <MenuItem value="Road">Road</MenuItem>
          </TextField>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default SessionForm;
