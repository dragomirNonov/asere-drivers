import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faCheck } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import sessionService from '../../../services/sessions.js';
import dayjs from 'dayjs';

import ManeuverSelectMenu from '../../common/ManeuverSelectMenu.jsx';
import TimeSelector from '../../common/TimeSelector.jsx';
import DatePicker from '../../common/DatePicker.jsx';

const SessionForm = ({ userId, onCreated, onCanceled }) => {
  const today = dayjs();
  const [createItem, setCreateItem] = useState({
    userId: userId,
    date: today,
    clockedIn: '',
    clockedOut: '',
    maneuver: '',
  });

  const handleChange = (field, value) => {
    setCreateItem((prevState) => ({ ...prevState, [field]: value }));
  };

  const onCreate = async (e) => {
    e.preventDefault();

    const sessionObj = {
      userId: userId,
      date: createItem.date.toISOString(),
      clockedIn: createItem.clockedIn,
      clockedOut: createItem.clockedOut,
      maneuver: createItem.maneuver,
    };

    try {
      await sessionService.createSession(sessionObj);
      onCreated();
      toast.success('Session added successfuly.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onCreate}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="md:flex flex-row">
        <div className="flex flex-row md:w-3/6 gap-4 ">
          <div className="w-3/6 ">
            <DatePicker
              value={createItem.date}
              handleChange={(value) => handleChange('date', value)}
            />
          </div>
          <div className="w-3/6 ">
            <ManeuverSelectMenu
              value={createItem.maneuver}
              handleChange={(e) => handleChange('maneuver', e.target.value)}
            />
          </div>
        </div>
        <div className="md:w-3/6 md:pl-4">
          <div className="mt-2 md:mt-0">
            <TimeSelector
              clockedIn={createItem.clockedIn}
              clockedOut={createItem.clockedOut}
              onClockedInChange={(value) => handleChange('clockedIn', value)}
              onClockedOutChange={(value) => handleChange('clockedOut', value)}
              showLabels={true}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <button type="submit">
          <FontAwesomeIcon
            icon={faCheck}
            color="green"
            className="px-2 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          />
        </button>
        <button type="button" onClick={onCanceled}>
          <FontAwesomeIcon
            icon={faCancel}
            color="white"
            className="px-2 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
          />
        </button>
      </div>
    </form>
  );
};

export default SessionForm;
