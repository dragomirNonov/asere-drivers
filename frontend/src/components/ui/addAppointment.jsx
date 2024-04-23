import { useState } from "react";
import appointmentService from "../../services/appointments";

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date: "",
    location: "",
    truck: "",
    permitExpDate: "",
    checkboxOption: "",
    time: "",
    DOB: "",
    email: "",
    DLnumber: "",
    transmission: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentObj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      DOB: formData.DOB,
      DLnumber: formData.DLnumber,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      truck: formData.truck,
      transmission: formData.transmission,
      permitExpDate: formData.permitExpDate,
      checkboxOption: formData.checkboxOption,
    };
    appointmentService
      .createNewAppt(appointmentObj)
      .then((res) => {
        setErrorMessage("");
        setSuccessMessage(res.data.message);
        // Reset the form fields
        setFormData({
          firstName: "",
          lastName: "",
          DOB: "",
          DLnumber: "",
          phone: "",
          email: "",
          location: "",
          date: "",
          time: "",
          truck: "",
          transmission: "",
          permitExpDate: "",
          checkboxOption: "",
        });
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:w-2/6 md:mt-10  bg-gray-300 md:rounded-lg w-full">
        <h2 className="font-bold text-yellow-400 text-4xl mb-2 bg-slate-700 w-full py-2 flex flex-col items-center md:rounded-t-lg">
          Add Appointment
        </h2>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-2 flex flex-col md:w-3/6 p-1">
              <label className="text-lg" htmlFor="firstName">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-1"
              />
            </div>
            <div className="mb-2 flex flex-col md:w-3/6 p-1">
              <label className="text-lg" htmlFor="lastName">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-1"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between ">
            <div className="mb-2 flex flex-col md:w-3/6 p-1">
              <label className="text-lg" htmlFor="date">
                DOB:
              </label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                className="p-1"
              />
            </div>
            <div className="mb-2 flex flex-col md:w-3/6 p-1">
              <label className="text-lg" htmlFor="licenseNumber">
                Driver's License Number:
              </label>
              <input
                type="text"
                id="DLnumber"
                name="DLnumber"
                value={formData.DLnumber}
                onChange={handleChange}
                className="p-1"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between ">
            <div className="mb-2 flex flex-col md:w-3/6 p-1">
              <label className="text-lg" htmlFor="phone">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-1"
              />
            </div>
            <div className="mb-2 flex flex-col md:w-3/6 p-1">
              <label className="text-lg" htmlFor="phone">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-1"
              />
            </div>
          </div>

          <div className="mb-2 flex flex-col">
            <label className="text-lg" htmlFor="location">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="p-1"
            />
          </div>

          <div className="flex flex-row justify-between ">
            <div className="mb-2 flex flex-col w-3/6 p-1">
              <label className="text-lg" htmlFor="date">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-1"
              />
            </div>

            <div className="mb-2 flex flex-col w-3/6 p-1">
              <label className="text-lg" htmlFor="location">
                Time:
              </label>
              <input
                type="text"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="p-1"
              />
            </div>
          </div>

          <div className="flex flex-row justify-between ">
            <div className="mb-2 flex flex-col w-3/6 p-1">
              <label className="text-lg" htmlFor="truck">
                Truck:
              </label>
              <input
                type="text"
                id="truck"
                name="truck"
                value={formData.truck}
                onChange={handleChange}
                className="p-1"
              />
            </div>
            <div className="mb-2 flex flex-col w-3/6 p-1">
              <label className="text-lg">Transmission</label>
              {/* Replace input with a select element for Transmission */}
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="p-1 "
              >
                <option value="" disabled>
                  Select transmission
                </option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div className="mb-2 flex flex-col">
            <label className="text-lg" htmlFor="permitExpDate">
              Permit Expiry Date:
            </label>
            <input
              type="date"
              id="permitExpDate"
              name="permitExpDate"
              value={formData.permitExpDate}
              onChange={handleChange}
              className="p-1"
            />
          </div>
          <div className="mb-2 flex flex-col items-center">
            <div>
              <label className="text-lg p-2 font-bold text-yellow-700">
                <input
                  type="checkbox"
                  name="checkboxOption"
                  value="placeholder"
                  checked={formData.checkboxOption === "placeholder"}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                Placeholder
              </label>
              <label className="text-lg p-2 font-bold text-green-600">
                <input
                  type="checkbox"
                  name="checkboxOption"
                  value="real"
                  checked={formData.checkboxOption === "real"}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                Real
              </label>
            </div>
          </div>
          <button
            className="text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg my-4"
            type="submit"
          >
            Submit
          </button>
          <div className="text-green-500">{successMessage}</div>
          <div className="text-red-500">{errorMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
