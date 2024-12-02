import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import truckImage from '../assets/truck3.png';
import arrow from '../assets/arrow.png';
import userService from '../services/users';

const loginSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  // .regex(
  //   /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
  //   'Invalid phone format',
  // ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await userService.login(data);

      localStorage.setItem('token', res.token);

      const decodeToken = (token) => {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          return decoded;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      };

      const decodedToken = decodeToken(res.token);
      const role = decodedToken.role;

      if (role === 'Student') {
        navigate('/studentui');
      } else if (role === 'Instructor') {
        navigate('/instructorui/appointments');
      } else {
        navigate('/adminUI/appointments');
      }
    } catch (err) {
      setError('root', {
        type: 'custom',
        message: err.message || 'Login failed',
      });
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed flex flex-col items-center w-auto h-screen"
      style={{ backgroundImage: `url(${truckImage})` }}>
      <div className="bg-gray-900 shadow-md rounded-md p-4 md:mt-20 flex flex-col items-center w-full h-screen md:h-max md:w-1/3">
        <h2 className="text-white font-bold p-2 text-3xl">SIGN IN</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-2">
          <div className="py-2 flex flex-col text-gray-500">
            <label>Phone</label>
            <input
              type="tel"
              {...register('phone')}
              className="p-1 rounded-md bg-gray-500 text-white"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="py-2 flex flex-col text-gray-500">
            <label>Password</label>
            <input
              type="password"
              {...register('password')}
              className="p-1 rounded-md bg-gray-500 text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex">
            <p className="text-gray-500 p-1">Don't have an account? </p>
            <Link
              to="/register"
              className="text-gray-500 ml-auto hover:text-white hover:rounded-md p-1">
              Register
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white font-bold p-2 bg-teal-700 w-full hover:bg-teal-900 rounded-lg mt-4 disabled:opacity-50">
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {errors.root && (
          <div className="text-red-500 mt-2">{errors.root.message}</div>
        )}

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

export default LoginPage;
