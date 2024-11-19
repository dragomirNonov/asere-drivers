import React from 'react';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { formatDate } from '../../utils/utils.js';
import Modal from '../Modal';
import TimePicker from '../studentUI/TimePicker.jsx';
import sessionServices from '../../services/sessions';
import SessionTable from './SessionTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

const StudentHoursModal = (props) => {
  const userId = props.info._id;
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [createItem, setCreateItem] = useState({
    userId: userId,
    date: '',
    startTime: '',
    endTime: '',
    maneuver: '',
  });

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

  //#region Delete

  const onDeleteItemClick = (session) => {
    setSelectedItem(session);
    setShowDeleteConfirm(true);
  };

  const onDeleteConfirmation = () => {
    sessionServices
      .deleteSessionById(selectedItem.id)
      .then(() => {
        populateSessions();
        toast.success('Session deleted successfuly.');
      })
      .catch((error) => {
        toast.error(error.message);
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
        toast.success('Session edited successfuly.');
      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Error fetching sessions:', error);
      })
      .finally(setShowDeleteConfirm(false));
  };

  const onCreate = (e) => {
    e.preventDefault();

    sessionServices
      .createSession(createItem)
      .then((response) => {
        toast.success('Session added successfuly.');
        populateSessions();
        setShowCreate(false);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.error('Error fetching sessions:', error.response.data.error);
      });
  };

  const handleChange = (field, value) => {
    setCreateItem({ ...createItem, [field]: value });
  };

  return (
    <>
      <button
        className="bg-gray-800 text-white  uppercase text-sm md:px-2 px-4 py-2 rounded-lg shadow
         hover:shadow-lg hover:bg-gray-700 outline-none focus:outline-none ml-auto mr-1  ease-linear transition-all 
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
        footer={
          <div className="flex justify-between">
            <button
              className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
              type="button"
              onClick={() => setShowCreate(true)}>
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="ms-2 px-3 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        }
        size="xl">
        <div>
          {showCreate && (
            <form
              onSubmit={onCreate}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              {/* First Row: Date and Maneuver */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Date Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-gray-600 text-sm font-medium mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={createItem.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>

                {/* Maneuver Dropdown */}
                <div className="flex flex-col">
                  <label
                    htmlFor="maneuver"
                    className="text-gray-600 text-sm font-medium mb-1">
                    Maneuver
                  </label>
                  <select
                    className="p-2 border border-gray-300 rounded-md text-sm"
                    name="maneuver"
                    value={createItem.maneuver}
                    onChange={(e) => handleChange('maneuver', e.target.value)}
                    required>
                    <option value="" disabled>
                      Select Maneuver
                    </option>
                    <option value="Pre Trip">Pre Trip</option>
                    <option value="Straight Back">Straight Back</option>
                    <option value="Off Set">Off Set</option>
                    <option value="Road">Road</option>
                  </select>
                </div>
              </div>

              {/* Second Row: Start and End Times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Start Time Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="startTime"
                    className="text-gray-600 text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <TimePicker
                    name="startTime"
                    value={createItem.startTime}
                    onChange={(e) => handleChange('startTime', e.target.value)}
                    className="border border-gray-300 rounded-md text-sm"
                  />
                </div>

                {/* End Time Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="endTime"
                    className="text-gray-600 text-sm font-medium mb-1">
                    End Time
                  </label>
                  <TimePicker
                    name="endTime"
                    value={createItem.endTime}
                    onChange={(e) => handleChange('endTime', e.target.value)}
                    className="border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Third Row: Actions */}
              <div className="flex items-center gap-4">
                <button type="submit" className="">
                  <FontAwesomeIcon icon={faCheck} color="green" />
                </button>
                <button
                  type="button"
                  className=""
                  onClick={() => setShowCreate(false)}>
                  <FontAwesomeIcon icon={faClose} color="red" />
                </button>
              </div>
            </form>
          )}
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
    </>
  );
};

export default StudentHoursModal;
