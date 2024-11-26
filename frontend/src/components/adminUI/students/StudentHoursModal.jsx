import React from 'react';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Modal from '../../common/Modal.jsx';
import sessionService from '../../../services/sessions.js';
import SessionTable from './SessionTable.jsx';
import Spinner from '../../common/Spinner.jsx';
import useStudentSessions from '../../../hooks/useStudentSessions.jsx';
import SessionForm from './SessionForm.jsx';

const StudentHoursModal = ({ info, studentHeading, onVisibilityChange }) => {
  const topContentRef = useRef(null);
  const userId = info._id;

  const { sessions, hours, isLoading, fetchSessions } =
    useStudentSessions(userId);

  const [showModal, setShowModal] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSessions();
    };

    if (userId) {
      fetchData();
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
      await sessionService.deleteSessionById(selectedItem.id);
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
      await sessionService.editSession(editedSession.id, item);
      await fetchSessions();
      toast.success('Session edited successfuly.');
    } catch (error) {
      toast.error(error.message);
      console.error('Error fetching sessions:', error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const onCreated = async () => {
    setShowCreate(false);
    await fetchSessions();
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
        <div ref={topContentRef}>
          {isLoading && <Spinner />}
          {showCreate && (
            <SessionForm
              userId={userId}
              onCreated={onCreated}
              onCanceled={() => setShowCreate(false)}
            />
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
