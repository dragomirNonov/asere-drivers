import { useState } from 'react';
import toast from 'react-hot-toast';
import TimeSelector from '../common/TimeSelector';

import sessionApi from '../../services/sessions';

const SessionForm = ({ userId, onAddSession }) => {
  const localDate = new Date().toISOString().split('T')[0];
  const initialFormData = {
    date: localDate,
    startTime: '',
    endTime: '',
    maneuver: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionObj = {
      userId: userId,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      maneuver: formData.maneuver,
    };

    try {
      await sessionApi.createSession(sessionObj);
      toast.success('You have Clocked-In');
      setFormData(initialFormData);
      onAddSession();
    } catch (error) {
      console.warn(error.message);
      console.warn(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mb-2">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Time Form</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="text-sm font-medium text-gray-700 mb-1">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border border-gray-300 rounded-md p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-full">
          <TimeSelector
            clockIn={formData.startTime}
            clockOut={formData.endTime}
            onClockInChange={(value) => handleTimeChange('startTime', value)}
            onClockOutChange={(value) => handleTimeChange('endTime', value)}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="maneuver1"
            className="text-sm font-medium text-gray-700 mb-1">
            Maneuver:
          </label>
          <select
            id="maneuver1"
            name="maneuver"
            value={formData.maneuver || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required>
            <option value="" disabled>
              Maneuver
            </option>
            <option value="Pre Trip">Pre Trip</option>
            <option value="Straight Back">Straight Back</option>
            <option value="Off Set">Off set</option>
            <option value="Road">Road</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
