import React from 'react';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/utils.js';
import Modal from '../Modal';
import TimeSelector from '../TimeSelector.jsx';
import sessionServices from '../../services/sessions';
import SessionTable from './SessionTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner.jsx';
import useStudentSessions from '../../hooks/useStudentSessions.jsx';

const StudentHoursModal = ({
  info,
  refresh,
  studentHeading,
  onVisibilityChange,
}) => {
  const topContentRef = useRef(null);
  const userId = info._id;

  const { sessions, hours, isLoading, fetchSessions } =
    useStudentSessions(userId);

  const [showModal, setShowModal] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchSessions();
    };

    if (userId) {
      fetchData(); // Call the async function
    }
  }, []);

  useEffect(() => {
    if (showCreate && topContentRef.current) {
      topContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCreate]);

  //#region Delete

  const onDeleteItemClick = (session) => {
    setSelectedItem(session);
    setShowDeleteConfirm(true);
  };

  const onDeleteConfirmation = async () => {
    try {
      await sessionServices.deleteSessionById(selectedItem.id);
      await fetchSessions();
      toast.success('Session deleted successfuly.');
    } catch (ex) {
      toast.error('Failed to delete session');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  //#endregion

  const onEditItem = async (editedSession) => {
    const item = {
      date: editedSession.date,
      clockedIn: editedSession.clockedIn,
      clockedOut: editedSession.clockedOut,
    };

    try {
      await sessionServices.editSession(editedSession.id, item);
      await fetchSessions();
      toast.success('Session edited successfuly.');
    } catch (error) {
      toast.error(error.message);
      console.error('Error fetching sessions:', error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const onCreate = async (e) => {
    e.preventDefault();
    debugger;
    try {
      await sessionServices.createSession(createItem);

      await fetchSessions();
      setShowCreate(false);

      toast.success('Session added successfuly.');
    } catch (error) {
      toast.error(error.response.data.error);
      console.error('Error fetching sessions:', error.response.data.error);
    }
  };

  const handleChange = (field, value) => {
    setCreateItem({ ...createItem, [field]: value });
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => {
          onVisibilityChange(false);
          setShowModal(false);
        }}
        onConfirm={null}
        title={studentHeading ? `${studentHeading}` : 'User Hours'}
        showConfirm={false}
        footer={
          <div className="flex items-center justify-between">
            {!showCreate && (
              <button
                className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                type="button"
                onClick={() => setShowCreate(true)}>
                Add
              </button>
            )}
            <div></div>
            <button
              type="button"
              onClick={() => {
                onVisibilityChange(false);
                setShowModal(false);
              }}
              className="ms-2 px-3 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        }
        size="xl">
        <div>
          {isLoading && <Spinner />}
          {showCreate && (
            <form
              ref={topContentRef}
              onSubmit={onCreate}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                    className="p-1 border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="maneuver"
                    className="text-gray-600 text-sm font-medium mb-1">
                    Maneuver
                  </label>
                  <select
                    className="p-1 border border-gray-300 rounded-md text-sm"
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
                <div className="flex flex-col">
                  <label
                    htmlFor="startTime"
                    className="text-gray-600 text-sm font-medium">
                    Start/End time
                  </label>
                  <TimeSelector
                    clockIn={createItem.startTime}
                    clockOut={createItem.endTime}
                    onClockInChange={(value) =>
                      handleChange('startTime', value)
                    }
                    onClockOutChange={(value) => handleChange('endTime', value)}
                  />
                </div>

                <div className="flex justify-end gap-3 mt-5">
                  <button type="submit">
                    <FontAwesomeIcon
                      icon={faCheck}
                      color="green"
                      className="px-2 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                    />
                  </button>
                  <button type="button" onClick={() => setShowCreate(false)}>
                    <FontAwesomeIcon
                      icon={faCancel}
                      color="white"
                      className="px-2 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
                    />
                  </button>
                </div>
              </div>
            </form>
          )}
          <SessionTable
            title="Pre Trip Sessions"
            sessions={sessions.preTrip}
            onEdit={onEditItem}
            onDelete={onDeleteItemClick}
          />
          <SessionTable
            title="Straight Back Sessions"
            sessions={sessions.straightBack}
            onEdit={onEditItem}
            onDelete={onDeleteItemClick}
          />
          <SessionTable
            title="Off Set Sessions"
            sessions={sessions.offSet}
            onEdit={onEditItem}
            onDelete={onDeleteItemClick}
          />
          <SessionTable
            title="Road Sessions"
            sessions={sessions.road}
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
