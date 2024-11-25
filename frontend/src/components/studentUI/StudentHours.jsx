import { useEffect } from 'react';

import SessionTable from './SessionTable.jsx';
import useStudentSessions from '../../hooks/useStudentSessions.jsx';

const StudentHours = ({ userId, toggle }) => {
  const { sessions, hours, isLoading, fetchSessions } =
    useStudentSessions(userId);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSessions();
    };

    if (userId) {
      fetchData(); // Call the async function
    }
  }, [toggle]);

  return (
    <div className="flex flex-col ">
      <div className="md:w-2/6 md:m-auto">
        <SessionTable title="Pre Trip Sessions" sessions={sessions.preTrip} />
        <SessionTable
          title="Straight Back Sessions"
          sessions={sessions.straightBack}
        />
        <SessionTable title="Off Set Sessions" sessions={sessions.offSet} />
        <SessionTable title="Road Sessions" sessions={sessions.road} />

        <div className="flex flex-row text-lg text-white items-center gap-4 bg-gray-800 md:mx-1">
          <div>
            <label htmlFor="date" className="">
              Pre-Trip:
            </label>
            <span className="font-light"> {hours.preTrip}</span>
          </div>
          <div>
            <label htmlFor="date" className="">
              Driving:
            </label>
            <span className="font-light"> {hours.driving}</span>
          </div>
          <div>
            <label htmlFor="date" className="">
              Total:
            </label>
            <span className="font-light"> {hours.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHours;
