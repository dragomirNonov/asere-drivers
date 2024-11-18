import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { formatDate } from '../../utils/utils.js';
import Modal from '../Modal';

import sessionServices from '../../services/sessions';
import SessionTable from './SessionTable.jsx';

const StudentHoursModal = (props) => {
  const userId = props.info._id;
  const [showModal, setShowModal] = useState(false);
  const [preTripSessions, setPreTripSessions] = useState([]);
  const [straightBackSessions, setStraightBackSessions] = useState([]);
  const [offSetSessions, setOffSetSessions] = useState([]);
  const [roadSessions, setRoadSessions] = useState([]);
  const [hours, setTotalHours] = useState({
    preTrip: 0,
    driving: 0,
    total: 0,
  });

  useEffect(() => {
    if (userId) {
      populateSessions();
    }
  }, []);

  const populateSessions = () => {
    sessionServices
      .getSessionsByStudentId(userId)
      .then((response) => {
        console.log('sessions', response.data);

        const sortedSessions = response.data?.map((x) => {
          const item = {
            id: x._id,
            displayDate: formatDate(x.date),
            date: x.date.split('T')[0],
            maneuver: x.maneuver,
            duration: x.duration,
            userId: x.user,
            clockedIn: x.clockedIn,
            displayClockedIn: x.clockedIn,
            clockedOut: x.clockedOut,
            displayClockedOut: x.clockedOut,
          };

          return item;
        });

        if (sortedSessions.length > 0) {
          var calculatedHours = calculateHours(sortedSessions);
          setTotalHours(calculatedHours);
        }

        setPreTripSessions(
          sortedSessions.filter((session) => session.maneuver === 'Pre Trip'),
        );

        setStraightBackSessions(
          sortedSessions.filter(
            (session) => session.maneuver === 'Straight Back',
          ),
        );

        setOffSetSessions(
          sortedSessions.filter((session) => session.maneuver === 'Off Set'),
        );

        setRoadSessions(
          sortedSessions.filter((session) => session.maneuver === 'Road'),
        );
      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Error fetching sessions:', error);
      });
  };

  // Function to calculate total hours across all sessions
  const calculateHours = (sessions) => {
    let preTrip = 0;
    let driving = 0;

    sessions.forEach((session) => {
      if (session.duration) {
        const duration = parseFloat(session.duration);
        if (session.maneuver === 'Pre Trip') {
          preTrip += duration;
        } else if (
          ['Straight Back', 'Off Set', 'Road'].includes(session.maneuver)
        ) {
          driving += duration;
        }
      }
    });

    const total = preTrip + driving;

    return {
      preTrip: preTrip.toFixed(2),
      driving: driving.toFixed(2),
      total: total.toFixed(2),
    };
  };

  return (
    <>
      <button
        className="bg-gray-800 text-white active:bg-blue-600 uppercase text-sm px-2 py-2 rounded-lg shadow
         hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all 
         duration-150 md:w-1/6"
        type="button"
        onClick={() => setShowModal(true)}>
        Hours
      </button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={null}
        title="User Hours"
        showConfirm={false}
        footer={<div className="flex justify-between"></div>}
        size="xl">
        <div>
          <SessionTable title="Pre Trip Sessions" sessions={preTripSessions} />
          <SessionTable
            title="Straight Back Sessions"
            sessions={straightBackSessions}
          />
          <SessionTable title="Off Set Sessions" sessions={offSetSessions} />
          <SessionTable title="Road Sessions" sessions={roadSessions} />

          <div className="flex flex-row items-center gap-4">
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
      </Modal>
    </>
  );
};

export default StudentHoursModal;
