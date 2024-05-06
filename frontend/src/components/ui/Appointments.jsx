import { useEffect, useState } from "react";
import Appointment from "./Appointment";
import appointmentService from "../../services/appointments";
import AddAppModal from "./AddAppModal";
import toast, { Toaster } from "react-hot-toast";

const Appointments = () => {
  const [arrayOfAppointments, setArrayOfAppointments] = useState([]);
  const notify = () => toast.success("Appointment Added Successfully");
  const deleteApp = () => toast.error("Appointment Deleted Successfully");

  // Define a function to fetch, filter, and sort appointments
  const fetchSortedAppointments = async () => {
    try {
      const allAppointments = await appointmentService.getAllAppointments();
      const currentDate = new Date();
      const filteredAppointments = allAppointments.filter(
        (app) => new Date(app.date) >= currentDate
      );
      return filteredAppointments.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch and sort appointments: ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchSortedAppointments().then((sortedAppointments) => {
      setArrayOfAppointments(sortedAppointments);
    });
  }, []);

  const refreshAppointments = () => {
    fetchSortedAppointments().then((sortedAppointments) => {
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
    <div className="flex flex-col items-center  mt-4  h-screen">
      <div className="mr-10">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <AddAppModal refresh={refreshAppointments} toast={notify} />
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
