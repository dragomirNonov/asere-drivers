import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import TimeSelector from '../common/TimeSelector';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField, MenuItem } from '@mui/material';
import sessionService from '../../services/sessions';

const sessionSchema = z
  .object({
    date: z
      .any()
      .refine((date) => date instanceof dayjs, 'Please select a date')
      .refine((date) => date.isValid(), 'Invalid date'),
    // .refine((date) => !date.isAfter(dayjs()), 'Cannot select future dates'),

    clockedIn: z
      .string()
      .min(1, 'Clock-in time is required')
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),

    clockedOut: z
      .string()
      .min(1, 'Clock-out time is required')
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),

    maneuver: z.enum(['Pre Trip', 'Straight Back', 'Off Set', 'Road'], {
      errorMap: () => ({ message: 'Please select a maneuver' }),
    }),
  })
  .refine(
    (data) => {
      const inTime = data.clockedIn.split(':').map(Number);
      const outTime = data.clockedOut.split(':').map(Number);
      const inMinutes = inTime[0] * 60 + inTime[1];
      const outMinutes = outTime[0] * 60 + outTime[1];
      return outMinutes > inMinutes;
    },
    {
      message: 'Clock-out time must be after clock-in time',
      path: ['clockedOut'],
    },
  );

const SessionForm = ({ userId, onAddSession }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      date: dayjs(),
      clockedIn: '',
      clockedOut: '',
      maneuver: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const sessionObj = {
        userId,
        date: data.date.toISOString(),
        clockedIn: data.clockedIn,
        clockedOut: data.clockedOut,
        maneuver: data.maneuver,
      };

      await sessionService.createSession(sessionObj);
      toast.success('You have Clocked-In');
      reset({ date: dayjs(), clockedIn: '', clockedOut: '', maneuver: '' });
      onAddSession();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mb-2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Time Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Select Date"
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                      variant: 'outlined',
                      className:
                        'border border-gray-300 rounded-md text-gray-800 bg-white',
                      error: !!errors.date,
                      helperText: errors.date?.message,
                    },
                  }}
                />
              )}
            />
          </div>

          <div className="w-full">
            <Controller
              name="clockedIn"
              control={control}
              render={({ field }) => (
                <Controller
                  name="clockedOut"
                  control={control}
                  render={({ field: clockOutField }) => (
                    <TimeSelector
                      clockedIn={field.value}
                      clockedOut={clockOutField.value}
                      onClockedInChange={field.onChange}
                      onClockedOutChange={clockOutField.onChange}
                      error={!!errors.clockedIn || !!errors.clockedOut}
                      helperText={
                        errors.clockedIn?.message || errors.clockedOut?.message
                      }
                    />
                  )}
                />
              )}
            />
          </div>

          <Controller
            name="maneuver"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Maneuver"
                variant="outlined"
                error={!!errors.maneuver}
                helperText={errors.maneuver?.message}
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
            )}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default SessionForm;
