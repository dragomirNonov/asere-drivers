import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DatePicker = ({ value, handleChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Picker
        label="Select Date"
        value={value}
        name="date"
        onChange={handleChange}
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
    </LocalizationProvider>
  );
};

export default DatePicker;
