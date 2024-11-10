import { useEffect, useState } from "react";
import Appointment from "./Appointment";
import appointmentService from "../../services/appointments";

import toast, { Toaster } from "react-hot-toast";

const Appointments = () => {
  const [arrayOfAppointments, setArrayOfAppointments] = useState([]);
  const [showAllAppointments, setShowAllAppointments] = useState(false); // State to toggle showing all appointments
  const [searchDate, setSearchDate] = useState(""); // State to store the selected search date

  const deleteApp = () => toast.error("Appointment Deleted Successfully");

  useEffect(() => {
    fetchSortedAppointments(showAllAppointments, searchDate).then(
      (sortedAppointments) => {
        setArrayOfAppointments(sortedAppointments);
      }
    );
  }, [showAllAppointments, searchDate]); // Add showAllAppointments and searchDate to the dependency array

  const fetchSortedAppointments = async (showAll, date) => {
    try {
      const allAppointments = await appointmentService.getAllRealAppointments();
      const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

      let filteredAppointments = allAppointments;

      if (!showAll) {
        // Only show appointments that are today or in the future
        filteredAppointments = allAppointments.filter(
          (app) => app.date >= currentDate
        );
      }

      if (date) {
        // Filter by the search date if provided
        filteredAppointments = filteredAppointments.filter(
          (app) =>
            new Date(app.date).toDateString() === new Date(date).toDateString()
        );
      }

      return filteredAppointments.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch and sort appointments: ${error.message}`
      );
    }
  };

  const refreshAppointments = () => {
    fetchSortedAppointments(showAllAppointments, searchDate).then(
      (sortedAppointments) => {
        setArrayOfAppointments(sortedAppointments);
      }
    );
  };

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Toggle between showing all appointments or only future appointments
  const toggleShowAll = () => {
    setShowAllAppointments((prev) => !prev);
  };

  const groupedAppointments = {};
  arrayOfAppointments.forEach((app) => {
    const date = app.date;
    if (!groupedAppointments[date]) {
      groupedAppointments[date] = [];
    }
    groupedAppointments[date].push(app);
  });

  const getDayOfWeek = (dateString) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="flex flex-col items-center mt-4 h-screen">
      <div className="mr-10">
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <div className="flex flex-col md:flex-row mt-2">
        <h2 className="text-red-800 font-bold p-1">
          *Appointments older than the current date are not shown.
        </h2>
        <input
          type="date"
          value={searchDate}
          onChange={handleDateChange}
          className="ml-2 rounded px-2 md:mr-auto m-1 md:w-auto md:p-1 p-2 mx-2"
        />
        {/* Toggle Button for Show All/Hide Old */}
        <button
          onClick={toggleShowAll}
          className="bg-teal-700 hover:bg-teal-900 text-white rounded px-2 mx-2 p-2"
        >
          {showAllAppointments ? "Hide Old" : "Show All"}
        </button>
      </div>

      <div className="flex flex-col md:w-4/6 w-full ">
        {Object.entries(groupedAppointments).map(([date, appointments]) => (
          <div key={date}>
            <p className="font-bold text-lg bg-slate-400 pl-3 mt-2">
              Date: {date} ({getDayOfWeek(date)})
            </p>
            {appointments.map((app, index) => (
              <Appointment
                key={index}
                firstName={app.firstName}
                lastName={app.lastName}
                DOB={app.DOB}
                DLnumber={app.DLnumber}
                phone={app.phone}
                email={app.email}
                location={app.location}
                date={app.date}
                time={app.time}
                truck={app.truck}
                transmission={app.transmission}
                permitExpiryDate={app.permitExpiryDate}
                pr={app.checkboxOption}
                id={app._id}
                refreshAppointments={refreshAppointments}
                deleteApp={deleteApp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
