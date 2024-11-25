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

const SessionRow = ({ session, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSession, setEditedSession] = useState(session);

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedSession({ ...editedSession, [field]: value });
  };

  const handleSaveClick = () => {
    onEdit(editedSession);
    setIsEditing(false);
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-1 text-center">
        {isEditing ? (
          <input
            type="date"
            id="date"
            name="date"
            value={editedSession.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="max-w-[85%]"
          />
        ) : (
          session.displayDate
        )}
      </td>
      <td className="py-1 text-center">
        {isEditing ? (
          <TimeSelector
            clockIn={editedSession.clockedIn}
            clockOut={editedSession.clockedOut}
            onClockInChange={(value) => handleChange('clockedIn', value)}
            onClockOutChange={(value) => handleChange('clockedOut', value)}
            showLabels={false}
          />
        ) : (
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-white rounded-lg shadow-sm p-2 min-w-max">
            <p>{session.displayClockedIn}</p>{' '}
            <div className="hidden md:block">
              <FontAwesomeIcon icon={faClock} color="darkblue" />
            </div>
            <p>{session.displayClockedOut}</p>
          </div>
        )}
      </td>
      <td className="py-1 text-center">{session.duration} hr(s)</td>
      <td className="py-1 text-center">
        {isEditing ? (
          <>
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
          </>
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
