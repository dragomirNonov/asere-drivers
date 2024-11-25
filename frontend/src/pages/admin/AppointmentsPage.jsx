import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AddAppModal from '../../components/adminUI/appoinments/AddAppModal';
import Appointment from '../../components/adminUI/appoinments/Appointment';
import appointmentService from '../../services/appointments';

const AppointmentsPage = () => {
  const [arrayOfAppointments, setArrayOfAppointments] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [searchDate, setSearchDate] = useState('');

  const notify = () => toast.success('Appointment Added Successfully');
  const deleteApp = () => toast.error('Appointment Deleted Successfully');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const decodeToken = (token) => {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    };

    const decodedToken = decodeToken(token);

    if (decodedToken) {
      setUserRole(decodedToken.role);

      const addAppButton = document.getElementById('newAppButton');
      const showAllButton = document.getElementById('showAll');
      if (decodedToken.role === 'Instructor') {
        if (addAppButton) {
          addAppButton.style.display = 'none';
        }
        if (showAllButton) {
          showAllButton.style.display = 'none';
        }
      }
    }

    fetchSortedAppointments(
      decodedToken?.role,
      showAllAppointments,
      searchDate,
    ).then((sortedAppointments) => {
      setArrayOfAppointments(sortedAppointments);
    });
  }, [showAllAppointments, searchDate]);

  const fetchSortedAppointments = async (role, showAll, date) => {
    try {
      const allAppointments = await appointmentService.getAllAppointments();
      let filteredAppointments = allAppointments;

      if (!showAll) {
        filteredAppointments = allAppointments.filter((app) => {
          const appDate = app.date;
          const currentDate = new Date().toISOString().slice(0, 10);
          return appDate >= currentDate;
        });
      }

      if (role === 'Instructor') {
        filteredAppointments = filteredAppointments.filter(
          (app) => app.checkboxOption === 'real',
        );
      }

      if (date) {
        filteredAppointments = filteredAppointments.filter(
          (app) =>
            new Date(app.date).toDateString() === new Date(date).toDateString(),
        );
      }

      return filteredAppointments.sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch and sort appointments: ${error.message}`,
      );
    }
  };

  const refreshAppointments = () => {
    fetchSortedAppointments(userRole, showAllAppointments, searchDate).then(
      (sortedAppointments) => {
        setArrayOfAppointments(sortedAppointments);
      },
    );
  };

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
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
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="flex flex-col items-center py-4 px-4">
      <div className="w-full max-w-6xl">
        <div id="newAppButton" className="flex justify-center">
          <AddAppModal refresh={refreshAppointments} toast={notify} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-4  p-4 ">
          <h2 className="text-red-800 font-bold">
            *Appointments older than the current date are not shown.
          </h2>
          <button
            id="showAll"
            onClick={() => setShowAllAppointments(!showAllAppointments)}
            className="bg-teal-700 hover:bg-teal-900 text-white rounded px-4 py-2">
            {showAllAppointments ? 'Hide Old' : 'Show All'}
          </button>
          <input
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            className="rounded px-4 py-2 border border-gray-300"
          />
        </div>

        <div className="mt-6 space-y-1">
          {Object.entries(groupedAppointments).map(([date, appointments]) => (
            <div key={date} className="overflow-hidden">
              <p className="font-bold text-lg bg-slate-400 px-4 py-2">
                Date: {date} ({getDayOfWeek(date)})
              </p>
              <div className="">
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
                    role={userRole}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
