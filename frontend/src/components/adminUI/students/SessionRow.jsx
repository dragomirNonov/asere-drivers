import { useState } from 'react';
import TimeSelector from '../../common/TimeSelector.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faCancel,
  faEdit,
  faTrashAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { formatTimeToAmPm } from '../../../utils/utils';
import dayjs from 'dayjs';
import DatePicker from '../../common/DatePicker.jsx';

const SessionRow = ({ session, onEdit, onDelete, columnCount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSession, setEditedSession] = useState(session);

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedSession((prevSession) => ({
      ...prevSession,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    onEdit(editedSession);
    setIsEditing(false);
  };

  return (
    <tr className="border-b border-gray-200 text-sm md:text-lg">
      <td className="py-1 text-center">
        {isEditing ? (
          <DatePicker
            value={dayjs(editedSession.date)}
            handleChange={(newDate) => handleChange('date', newDate)}
          />
        ) : (
          session.displayDate
        )}
      </td>
      <td className="py-1 text-center ">
        {isEditing ? (
          <TimeSelector
            clockedIn={editedSession.clockedIn}
            clockedOut={editedSession.clockedOut}
            onClockedInChange={(value) => handleChange('clockedIn', value)}
            onClockedOutChange={(value) => handleChange('clockedOut', value)}
            showLabels={false}
          />
        ) : (
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-white rounded-lg shadow-sm p-2 min-w-max">
            <p>{formatTimeToAmPm(session.displayClockedIn)}</p>{' '}
            <div className="hidden md:block">
              <FontAwesomeIcon icon={faClock} color="darkblue" />
            </div>
            <p>{formatTimeToAmPm(session.displayClockedOut)}</p>
          </div>
        )}
      </td>
      {/* {!isEditing && ( */}
      <td className="py-1 text-center">{session.duration} hr(s)</td>
      {/* )} */}
      <td className="py-1 text-center">
        {isEditing ? (
          <div className="text-center ">
            <button onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faSave} color="green" className="px-2" />
            </button>
            <button onClick={onCancelEdit}>
              <FontAwesomeIcon
                icon={faCancel}
                color="silver"
                className="px-2"
              />
            </button>
          </div>
        ) : (
          <>
            <button onClick={onEditClick}>
              <FontAwesomeIcon icon={faEdit} color="blue" className="px-2" />
            </button>
            <button onClick={() => onDelete(session)}>
              <FontAwesomeIcon icon={faTrashAlt} color="red" className="px-2" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default SessionRow;
