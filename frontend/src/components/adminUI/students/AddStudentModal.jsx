import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import userService from '../../../services/users';

const studentSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .regex(/^[a-zA-Z\s-]{2,50}$/, 'Only letters, spaces, and hyphens allowed'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[a-zA-Z\s-]{2,50}$/, 'Only letters, spaces, and hyphens allowed'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      'Invalid phone format',
    ),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  transmission: z.enum(['Automatic', 'Standard'], {
    errorMap: () => ({ message: 'Please select a transmission type' }),
  }),
  clas: z.enum(['A', 'B'], {
    errorMap: () => ({ message: 'Please select a license class' }),
  }),
  DLnumber: z
    .string()
    .min(1, "Driver's license is required")
    .regex(/^[A-Z0-9]{5,20}$/, 'Must be 5-20 alphanumeric characters'),
  DOB: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const years =
        new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() - 1970;
      return years >= 18;
    }, 'Must be at least 18 years old'),
  permitExpDate: z.string().min(1, 'Permit expiration date is required'),
});

const AddStudentModal = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      permitExpDate: null,
      DOB: null,
      email: '',
      DLnumber: '',
      transmission: 'Standard',
      clas: 'A',
    },
  });

  const onSubmit = async (data) => {
    // Convert dayjs dates to ISO string format
    const formattedData = {
      ...data,
      DOB: data.DOB ? dayjs(data.DOB).format('YYYY-MM-DD') : null,
      permitExpDate: data.permitExpDate
        ? dayjs(data.permitExpDate).format('YYYY-MM-DD')
        : null,
    };

    try {
      const res = await userService.addStudent(formattedData);
      handleSuccess(res);
    } catch (err) {
      handleError(err);
    }
  };

  const handleSuccess = () => {
    setErrorMessage('');
    resetForm();
    setShowModal(false);
    props.refresh();
    props.toast();
  };

  const handleError = (err) => {
    setSuccessMessage('');
    const errorMessage = err.message || 'Unknown error occurred';
    setErrorMessage(errorMessage);
  };

  return (
    <>
      <button
        id="newAppButton"
        className="text-white font-bold p-4 bg-teal-700 md:w-1/6 w-96 hover:bg-teal-900 rounded-lg my-4"
        type="button"
        onClick={() => {
          setErrorMessage('');
          setSuccessMessage('');
          setShowModal(true);
        }}>
        Add a New Student
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative lg:w-2/6 my-6 md:mt-60 w-full h-full mx-auto max-w-3xl">
              <div className="border-0 bg-slate-200 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white">
                  <h3 className="text-3xl font-semibold">Add Student</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}>
                    <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="First Name"
                                variant="outlined"
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                fullWidth
                                InputProps={{
                                  style: { textTransform: 'uppercase' },
                                }}
                              />
                            )}
                          />
                        </div>
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Last Name"
                                variant="outlined"
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                fullWidth
                                InputProps={{
                                  style: { textTransform: 'uppercase' },
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <Controller
                            name="DOB"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(newValue) => {
                                  field.onChange(
                                    dayjs(newValue).format('YYYY-MM-DD'),
                                  );
                                }}
                                label="Date of Birth"
                                slotProps={{
                                  textField: {
                                    error: !!errors.DOB,
                                    helperText: errors.DOB?.message,
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <Controller
                            name="DLnumber"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Driver's License Number"
                                variant="outlined"
                                error={!!errors.DLnumber}
                                helperText={errors.DLnumber?.message}
                                fullWidth
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Phone"
                                variant="outlined"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                fullWidth
                              />
                            )}
                          />
                        </div>
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Email"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                fullWidth
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex md:flex-row justify-between">
                        <div className="mb-2 flex flex-col w-3/6 p-1">
                          <Controller
                            name="transmission"
                            control={control}
                            render={({ field }) => (
                              <FormControl
                                error={!!errors.transmission}
                                fullWidth>
                                <InputLabel>Transmission</InputLabel>
                                <Select {...field} label="Transmission">
                                  <MenuItem value="Automatic">
                                    Automatic
                                  </MenuItem>
                                  <MenuItem value="Standard">Standard</MenuItem>
                                </Select>
                                <FormHelperText>
                                  {errors.transmission?.message}
                                </FormHelperText>
                              </FormControl>
                            )}
                          />
                        </div>
                        <div className="mb-2 flex flex-col w-3/6 p-1">
                          <Controller
                            name="clas"
                            control={control}
                            render={({ field }) => (
                              <FormControl error={!!errors.clas} fullWidth>
                                <InputLabel>Class</InputLabel>
                                <Select {...field} label="Class">
                                  <MenuItem value="A">A</MenuItem>
                                  <MenuItem value="B">B</MenuItem>
                                </Select>
                                <FormHelperText>
                                  {errors.clas?.message}
                                </FormHelperText>
                              </FormControl>
                            )}
                          />
                        </div>
                        <div className="mb-2 flex flex-col w-3/6 p-1">
                          <Controller
                            name="permitExpDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(newValue) => {
                                  field.onChange(
                                    dayjs(newValue).format('YYYY-MM-DD'),
                                  );
                                }}
                                label="Permit Expiration Date"
                                slotProps={{
                                  textField: {
                                    error: !!errors.permitExpDate,
                                    helperText: errors.permitExpDate?.message,
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <button
                        className="text-white font-bold p-4 bg-teal-700 w-full hover:bg-teal-900 rounded-lg my-4"
                        type="submit">
                        Submit
                      </button>
                      <div className="text-green-500">{successMessage}</div>
                      <div className="text-red-500">{errorMessage}</div>
                    </form>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddStudentModal;
