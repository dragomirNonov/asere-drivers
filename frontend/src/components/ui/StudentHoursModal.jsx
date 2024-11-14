import React from 'react';
import { useState, useEffect } from 'react';
import Modal from '../Modal';
import sessionServices from '../../services/sessions';
import SessionTable from './SessionTable';

const StudentHoursModal = (props) => {
  const userId = props.info._id;
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
            displayClockedIn: formatTime(x.clockedIn),
            clockedOut: x.clockedOut,
            displayClockedOut: formatTime(x.clockedOut),
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
        console.error('Error fetching sessions:', error);
      });
  };

  // Function to format dates in MM/DD/YYYY format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${month}/${day}/${year}`;
  };

  // Function to format time from 24-hour to 12-hour AM/PM format
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let formattedTime = '';

    if (parseInt(hours, 10) === 0) {
      formattedTime = `12:${minutes} `; // Midnight case
    } else if (parseInt(hours, 10) === 12) {
      formattedTime = `12:${minutes} `; // Noon case
    } else if (parseInt(hours, 10) > 12) {
      formattedTime = `${parseInt(hours, 10) - 12}:${minutes} `; // PM case
    } else {
      formattedTime = `${hours}:${minutes} `; // AM case
    }

    return formattedTime;
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

  //#region Delete

  const onDeleteItemClick = (session) => {
    setSelectedItem(session);
    setShowDeleteConfirm(true);
  };

  const onDeleteConfirmation = () => {
    sessionServices
      .deleteSessionById(selectedItem.id)
      .then((response) => {
        populateSessions();
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      })
      .finally(setShowDeleteConfirm(false));
  };

  //#endregion

  const onEditItem = (editedSession) => {
    const item = {
      date: editedSession.date,
      clockedIn: editedSession.clockedIn,
      clockedOut: editedSession.clockedOut,
    };

    sessionServices
      .editSession(editedSession.id, item)
      .then((response) => {
        populateSessions();
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      })
      .finally(setShowDeleteConfirm(false));
  };

  const onShowCreate = (session) => {
    debugger;
  };

  return (
    <>
      <button
        className="bg-orange-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-2 py-2 rounded-lg shadow hover:shadow-lg hover:bg-orange-700 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all duration-150 md:w-1/6"
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
        size="xl">
        <div>
          <span>Total: {hours.preTrip}</span>

          <SessionTable
            title="Pre Trip Sessions"
            sessions={preTripSessions}
            onEdit={onEditItem}
            onDelete={onDeleteItemClick}
          />
          <SessionTable
            title="Straight Back Sessions"
            sessions={straightBackSessions}
            onEdit={onEditItem}
            onDelete={onDeleteItemClick}
          />
          <SessionTable
            title="Off Set Sessions"
            sessions={offSetSessions}
            onEdit={onEditItem}
            onDelete={onDeleteItemClick}
          />
          <SessionTable
            title="Road Sessions"
            sessions={roadSessions}
            onEdit={onEditItem}
            onDelete={onDeleteItemClick}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onDeleteConfirmation}
        title="Delete Confirmation"
        showConfirm={true}
        size="sm">
        <p className="text-center text-sm text-red-600">
          Are you shure you want to delete this record?
        </p>
      </Modal>

      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onConfirm={onCreate}
        title="Create new session"
        showConfirm={true}
        size="sm">
        <p className="text-center text-sm text-red-600">session</p>
      </Modal>
    </>
  );
};

export default StudentHoursModal;
