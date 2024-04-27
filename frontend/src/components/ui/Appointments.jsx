import { useEffect, useState } from "react";
import Appointment from "./Appointment";
import appointmentService from "../../services/appointments";

const Appointments = () => {
  const [arrayOfAppointments, setArrayOfAppointments] = useState([]);

  useEffect(() => {
    appointmentService.getAll().then((res) => {
      // Filter appointments older than the current date
      const currentDate = new Date();
      const filteredAppointments = res.data.filter(
        (app) => new Date(app.date) >= currentDate
      );
      // Sort filtered appointments by date
      const sortedAppointments = filteredAppointments.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      // Set state with sorted appointments
      setArrayOfAppointments(sortedAppointments);
    });
  }, []);

  // Define a function to fetch and update appointments
  const refreshAppointments = () => {
    appointmentService.getAll().then((res) => {
      // Filter appointments older than the current date
      const currentDate = new Date();
      const filteredAppointments = res.data.filter(
        (app) => new Date(app.date) >= currentDate
      );
      // Sort filtered appointments by date
      const sortedAppointments = filteredAppointments.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      // Set state with sorted appointments
      setArrayOfAppointments(sortedAppointments);
    });
  };

  // Group appointments by date
  const groupedAppointments = {};
  arrayOfAppointments.forEach((app) => {
    const date = app.date;
    if (!groupedAppointments[date]) {
      groupedAppointments[date] = [];
    }
    groupedAppointments[date].push(app);
  });

  // Function to get day of the week
  const getDayOfWeek = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="flex flex-col items-center  mt-4 h-screen">
      <div className=" m-4">
        <a
          className="text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg mt-4"
          href="/ui/addappointment"
        >
          Make a New Appointment
        </a>
      </div>
      <h2 className="text-red-800 font-bold">
        *Appointments older than the current date are not shown.
      </h2>
      <div className=" flex flex-col md:w-4/6 w-full">
        {/* Render appointments grouped by date */}
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
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
