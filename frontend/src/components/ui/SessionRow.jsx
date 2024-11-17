import { useState } from 'react';
import TimePicker from '../studentUI/TimePicker.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faCancel,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

const SessionRow = ({ session, onEdit, isEditing, setIsEditing, onDelete }) => {
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
      <td className="py-1 md:px-2">
        {isEditing ? (
          <input
            type="date"
            id="date"
            name="date"
            value={editedSession.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="p-1 max-w-[85%]"
          />
        ) : (
          session.displayDate
        )}
      </td>
      <td className="py-1 md:px-2">
        {isEditing ? (
          <TimePicker
            name="clockedIn"
            value={editedSession.clockedIn}
            onChange={(e) => handleChange('clockedIn', e.target.value)}
          />
        ) : (
          session.displayClockedIn
        )}
      </td>
      <td className="py-1 md:px-2">
        {isEditing ? (
          <TimePicker
            name="clockedOut"
            value={editedSession.clockedOut}
            onChange={(e) => handleChange('clockedOut', e.target.value)}
          />
        ) : (
          session.displayClockedOut
        )}
      </td>
      {!isEditing && <td className="py-1 md:px-2">{session.duration} hr(s)</td>}
      <td className="py-1 md:px-2">
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
