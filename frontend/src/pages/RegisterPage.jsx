import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userServices from '../services/users';

import toast from 'react-hot-toast';
import truckImage from '../assets/truck3.png';
import arrow from '../assets/arrow.png';

const RegisterPage = () => {
  const defaultValues = {
    DLnumber: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    DOB: '',
    transmission: '',
    class: '',
  };

  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const resetFormData = () => {
    setFormData(defaultValues);
  };

  const isValidData = (data) => {
    let errors = {};

    if (!data.firstName) {
      errors.firstName = '`First Name` is required.';
    }

    if (!data.lastName) {
      errors.lastName = '`Last Name` is required.';
    }

    if (!data.phone) {
      errors.phone = '`Phone` is required.';
    }

    if (data.phone && !/^\d+$/.test(String(data.phone).trim())) {
      errors.phone = 'Field must contains only digits.';
    }

    if (!data.email) {
      errors.email = '`Email` is required.';
    }

    if (
      data.email &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
    ) {
      errors.email = 'Invalid email format.';
    }

    if (!data.transmission) {
      errors.transmission = '`Transmission` is required.';
    }

    if (!data.class) {
      errors.class = '`Transmission` is required.';
    }

    if (!data.DLnumber) {
      errors.DLnumber = "`Driver's License #` is required.";
    } else if (data.DLnumber.length < 5) {
      errors.DLnumber =
        '`Driver&#39;s License #` length must be more than 5 symbols.';
    }

    if (!data.DOB) {
      errors.DOB = '`Date of Birth` is required.';
    }

    if (!data.password) {
      errors.password = '`Password` is required.';
    } else if (data.password.length < 6) {
      errors.password = '`Password` length must be more than 6 symbols.';
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = '`Confirm Password` do not match.';
    }

    setErrors(errors);
    const isValid = Object.keys(errors).length === 0;

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidData(formData)) {
      return;
    }

    const registerObj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      transmission: formData.transmission,
      clas: formData.class,
      DLnumber: formData.DLnumber,
      password: formData.password,
      DOB: formData.DOB,
    };

    try {
      const res = await userServices.register(registerObj);

      resetFormData();
      toast.success(res.message);
      setTimeout(() => {
        navigate('/login');
      }, 1500); // 1500ms = 1.5 seconds delay
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed w-full min-h-screen"
      style={{
        backgroundImage: `url(${truckImage})`,
      }}>
      <div className="bg-gray-900 shadow-md rounded-md p-4 md:mt-10 flex flex-col items-center w-full mx-auto md:h-max md:w-2/6">
        <h2 className="text-white font-bold p-2 text-3xl">SIGN UP</h2>
        <form onSubmit={handleSubmit} className="w-full p-2">
          <div className="md:flex md:flex-row my-0">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="first_name">First Name </label>
              <input
                type="text"
                id="first_name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500 ">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="transmission-type">Transmission</label>
              {/* Replace input with a select element for Transmission */}
              <select
                id="transmission-type"
                value={formData.transmission}
                name="transmission"
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white">
                <option value="" disabled>
                  Select transmission
                </option>
                <option value="Automatic">Automatic</option>
                <option value="Standard">Standard</option>
              </select>
              {errors.transmission && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.transmission}
                </p>
              )}
            </div>

            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="class">Class</label>
              {/* Replace input with a select element for Class */}
              <select
                id="class"
                value={formData.class}
                name="class"
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white">
                <option value="" disabled>
                  Select class
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">{errors.class}</p>
              )}
            </div>
          </div>

          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500 ">
              <label htmlFor="driver_license">Driver&#39;s License # </label>
              <input
                type="text"
                id="driver_license"
                name="DLnumber"
                value={formData.DLnumber}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.DLnumber && (
                <p className="text-red-500 text-sm mt-1">{errors.DLnumber}</p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.DOB && (
                <p className="text-red-500 text-sm mt-1">{errors.DOB}</p>
              )}
            </div>
          </div>

          <div className="md:flex flex-row">
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="p-1 flex flex-col md:w-1/2 text-gray-500">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-500 text-white"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex">
            <p className="text-gray-500 p-1">Already have an account? </p>
            <a
              href="/login"
              className="text-gray-500 ml-auto hover:text-white hover:rounded-md p-1">
              Login{' '}
            </a>
          </div>

          <button
            type="submit"
            className="text-white font-bold p-2 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg mt-4">
            Register
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
