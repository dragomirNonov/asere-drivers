import { useState, useEffect } from 'react';

import Modal from '../common/Modal.jsx';
import useStudentSessions from '../../hooks/useStudentSessions.jsx';
import SessionTable from './SessionTable.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const StudentHoursModal = (props) => {
  const userId = props.info._id;
  const [showModal, setShowModal] = useState(false);

  const { sessions, hours, isLoading, fetchSessions } =
    useStudentSessions(userId);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSessions();
      console.log(sessions);
    };

    if (userId) {
      fetchData();
    }
  }, []);

  return (
    <>
      <button
        className="bg-gray-800 text-white active:bg-blue-600 uppercase text-sm px-2 py-2 rounded-lg shadow
         hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all 
         duration-150 "
        type="button"
        onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
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
            <div className="flex flex-row items-center gap-4 text-black">
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
        }
        size="xl">
        <div>
          <SessionTable title="Pre Trip Sessions" sessions={sessions.preTrip} />
          <SessionTable
            title="Straight Back Sessions"
            sessions={sessions.straightBack}
          />
          <SessionTable title="Off Set Sessions" sessions={sessions.offSet} />
          <SessionTable title="Road Sessions" sessions={sessions.road} />
        </div>
      </Modal>
    </>
  );
};

export default StudentHoursModal;
