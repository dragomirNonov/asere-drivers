import { useState, useEffect } from "react";
import appointments from "../../services/appointments";

const Appointment = (props) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage pop-up form visibility

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const PopupForm = () => {
    const [editedInfo, setEditedInfo] = useState({
      firstName: props.firstName,
      lastName: props.lastName,
      date: props.date,
      location: props.location,
      truck: props.truck,
      transmission: props.transmission,
      DOB: props.DOB,
      DLnumber: props.DLnumber,
      phone: props.phone,
      email: props.email,
      permitExpiryDate: props.permitExpiryDate,
      id: props.id,
      checkboxOption: props.pr,
      // Add more fields as needed
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedInfo({
        ...editedInfo,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission, for example: save editedInfo to database
      console.log("Edited Info:", editedInfo);
      appointments.editAppointment(editedInfo).then(() => {
        props.refreshAppointments();
      });
      // Close the pop-up
      togglePopup();
    };

    return (
      <div className="popup">
        {/* <h2 className="font-bold">Edit Appointment</h2> */}
        <form onSubmit={handleSubmit} className="flex flex-col lg:w-2/6 mb-2">
          {/* <label className="p-1 flex justify-between">
            ID:
            <input
              type="text"
              name="name"
              value={editedInfo.id}
              onChange={handleChange}
              className="p-1"
              disabled
            />
          </label> */}
          <label className="p-1 flex justify-between">
            First Name:
            <input
              type="text"
              name="firstName"
              value={editedInfo.firstName}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <label className="p-1 flex justify-between">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={editedInfo.lastName}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <label className="p-1 flex justify-between">
            Date:
            <input
              type="date"
              name="date"
              value={editedInfo.date}
              onChange={handleChange}
              className="p-1"
              htmlFor="date"
            />
          </label>
          <label className="p-1 flex justify-between">
            Location:
            <input
              type="text"
              name="location"
              value={editedInfo.location}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <label className="p-1 flex justify-between">
            Truck:
            <input
              type="text"
              name="truck"
              value={editedInfo.truck}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <label className="p-1 flex justify-between">
            Transmission:
            <select
              name="transmission"
              value={editedInfo.transmission}
              onChange={handleChange}
              className="p-1"
            >
              <option value="Automatic">Automatic</option>
              <option value="Standard">Standard</option>
            </select>
          </label>

          <label className="p-1 flex justify-between">
            Date of Birth: :
            <input
              type="date"
              name="DOB"
              value={editedInfo.DOB}
              onChange={handleChange}
              className="p-1"
              htmlFor="date"
            />
          </label>
          <label className="p-1 flex justify-between">
            Driver's Liscense Num:
            <input
              type="text"
              name="DLnumber"
              value={editedInfo.DLnumber}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <label className="p-1 flex justify-between">
            Phone:
            <input
              type="text"
              name="phone"
              value={editedInfo.phone}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <label className="p-1 flex justify-between">
            Email:
            <input
              type="text"
              name="email"
              value={editedInfo.email}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <label className="p-1 flex justify-between">
            Permit Expiry Date::
            <input
              type="date"
              name="permitExpiryDate"
              value={editedInfo.permitExpiryDate}
              onChange={handleChange}
              className="p-1"
            />
          </label>
          <div>
            <label className="text-lg p-2 font-bold text-yellow-700">
              <input
                type="checkbox"
                name="checkboxOption"
                value="placeholder"
                checked={editedInfo.checkboxOption === "placeholder"}
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
                checked={editedInfo.checkboxOption === "real"}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              Real
            </label>
          </div>
          {/* Add more input fields as needed */}
          <button
            type="submit"
            className="p-1 mt-1 border bg-slate-200 hover:bg-green-800"
          >
            Save
          </button>
          <button
            className="p-1 mt-1 border bg-slate-200 hover:bg-red-700"
            onClick={togglePopup}
          >
            Delete
          </button>
        </form>
      </div>
    );
  };

  return (
    <div
      className={`flex  flex-col p-2 my-1 ${
        props.pr === "real"
          ? "bg-green-500"
          : props.pr === "placeholder"
          ? "bg-yellow-400"
          : props.pr === "header"
          ? "bg-slate-600"
          : ""
      }`}
    >
      <button
        onClick={() => {
          setAccordionOpen(!accordionOpen);
          setIsPopupOpen(false);
        }}
        className="flex justify-between w-full"
      >
        <span className="text-sm md:text-lg text-black font-bold">
          {props.firstName +
            " " +
            props.lastName +
            " " +
            " | " +
            props.date +
            " | " +
            props.location +
            " | " +
            props.truck +
            " " +
            props.transmission}
        </span>

        <svg
          className="fill-black shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>

      {/* Render pop-up form conditionally */}
      {isPopupOpen && <PopupForm />}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className=" overflow-hidden text-black font-bold ">
          {
            <div className="flex flex-col mt-4">
              <p>DOB: {props.DOB}</p>
              <p>Driver's License Number: {props.DLnumber}</p>
              <p>Phone: {props.phone}</p>
              <p>Email: {props.email}</p>
              <p>Permit Expiry Date: {props.permitExpiryDate}</p>
              {/* <p>ID: {props.id}</p> */}
              {/* Button to open pop-up form */}
              <button
                onClick={togglePopup}
                className="edit-button ml-auto px-4 py-1 border border-black hover:bg-yellow-600 hover:text-white rounded-lg hover:border-collapse"
              >
                Edit
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Appointment;
