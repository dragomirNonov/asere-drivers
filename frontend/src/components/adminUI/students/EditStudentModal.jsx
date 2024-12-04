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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  DOB: z.string().min(1, 'Date of birth is required'),
  permitExpiryDate: z.string().min(1, 'Permit expiration date is required'),
});

const EditStudentModal = ({ info, refresh }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: info.firstName,
      lastName: info.lastName,
      phone: info.phone,
      permitExpiryDate: info.permitExpiryDate,
      DOB: info.DOB,
      email: info.email,
      DLnumber: info.DLnumber,
      transmission: info.transmission,
      clas: info.clas,
    },
  });

  const onSubmit = async (data) => {
    try {
      await userService.editStudent(data, info._id);
      refresh();
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await userService.deleteStudent(info._id);
      setOpenDeleteDialog(false); // Close the confirmation dialog
      setShowModal(false); // Close the edit modal
      refresh();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <button
        className="bg-gray-800 text-white font-bold uppercase text-sm md:px-2 px-4 py-2 rounded-lg shadow hover:shadow-lg hover:bg-gray-700 outline-none focus:outline-none ml-auto mr-1  ease-linear transition-all duration-150 md:w-1/6"
        type="button"
        onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative lg:w-2/6 my-6 mx-auto max-w-3xl">
              <div className="border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white">
                  <h3 className="text-3xl font-semibold">Edit Student Info</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
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
                            name="permitExpiryDate"
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
                                    error: !!errors.permitExpiryDate,
                                    helperText:
                                      errors.permitExpiryDate?.message,
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      {errorMessage && (
                        <div className="text-red-500 mt-2">{errorMessage}</div>
                      )}

                      <div className="flex items-center justify-end mt-6 border-t border-solid border-blueGray-200 pt-6">
                        <div className="mx-1">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteClick} // Changed from handleDelete
                            className="mr-auto">
                            Delete
                          </Button>
                        </div>
                        <div className="mx-1">
                          <Button
                            variant="contained"
                            color="success"
                            type="submit">
                            Save Changes
                          </Button>
                        </div>
                        <div className="mx-1">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setShowModal(false)}
                            className="mr-2">
                            Close
                          </Button>
                        </div>
                      </div>
                    </form>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditStudentModal;
