import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import truckImage from '../assets/truck3.png';
import arrow from '../assets/arrow.png';
import userServices from '../services/users';

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .regex(
        /^[a-zA-Z\s-]{2,50}$/,
        'Only letters, spaces, and hyphens allowed',
      ),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .regex(
        /^[a-zA-Z\s-]{2,50}$/,
        'Only letters, spaces, and hyphens allowed',
      ),
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
    class: z.enum(['A', 'B'], {
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
          new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() -
          1970;
        return years >= 18;
      }, 'Must be at least 18 years old'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    // .regex(/[A-Z]/, 'Must contain uppercase letter')
    // .regex(/[a-z]/, 'Must contain lowercase letter')
    // .regex(/[0-9]/, 'Must contain number')
    // .regex(/[@$!%*?&]/, 'Must contain special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      transmission: '',
      class: '',
      DLnumber: '',
      DOB: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const registerObj = {
        ...data,
        clas: data.class,
      };
      delete registerObj.confirmPassword;

      const res = await userServices.register(registerObj);
      toast.success(res.message);
      reset();
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed w-full min-h-screen"
      style={{ backgroundImage: `url(${truckImage})` }}>
      <div className="bg-gray-900 shadow-md rounded-md p-4 md:mt-10 flex flex-col items-center w-full mx-auto md:h-max md:w-2/6">
        <h2 className="text-white font-bold p-2 text-3xl">SIGN UP</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-2">
          <div className="md:flex md:flex-row my-0">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                {...register('firstName')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                {...register('lastName')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                {...register('phone')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register('email')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="transmission">Transmission</label>
              <select
                {...register('transmission')}
                className="p-1 rounded-md bg-gray-500 text-white">
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Standard">Standard</option>
              </select>
              {errors.transmission && (
                <p className="text-red-500 text-sm">
                  {errors.transmission.message}
                </p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="class">Class</label>
              <select
                {...register('class')}
                className="p-1 rounded-md bg-gray-500 text-white">
                <option value="">Select class</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
              {errors.class && (
                <p className="text-red-500 text-sm">{errors.class.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="DLnumber">Driver's License #</label>
              <input
                type="text"
                {...register('DLnumber')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.DLnumber && (
                <p className="text-red-500 text-sm">
                  {errors.DLnumber.message}
                </p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="DOB">Date of Birth</label>
              <input
                type="date"
                {...register('DOB')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.DOB && (
                <p className="text-red-500 text-sm">{errors.DOB.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register('password')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex">
            <p className="text-gray-500 p-1">Already have an account?</p>
            <Link
              to="/login"
              className="text-gray-500 ml-auto hover:text-white hover:rounded-md p-1">
              Login
            </Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white font-bold p-2 bg-teal-700 w-full hover:bg-teal-900 rounded-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <Link to="/">
          <img
            src={arrow}
            className="w-10 mt-2 hover:p-3 p-2 rounded"
            alt="Arrow"
            id="home"
            style={{ filter: 'invert(1)' }}
          />
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
