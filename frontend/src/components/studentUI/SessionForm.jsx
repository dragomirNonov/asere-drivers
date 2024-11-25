import { useState } from 'react';
import toast from 'react-hot-toast';
import TimeSelector from '../common/TimeSelector';

import sessionServices from '../../services/sessions';

const SessionForm = ({ userId, onAddSession }) => {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split('T')[0];
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const sessionObj = {
      userId: userId,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      maneuver: formData.maneuver,
    };

    sessionServices.createSession(sessionObj).then(() => {
      toast.success('You have Clocked-In');
      setFormData(initialFormData);
      onAddSession();
    });
  };

  return (
    <div className="flex flex-col md:p-2">
      <div className="mt-2 w-full md:w-2/6 md:m-auto md:mt-5 bg-slate-200 md:rounded-lg mb-2">
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-800 font-bold text-lg text-white md:rounded-lg p-1 px-3 mb-2">
            <label>Time Form</label>
          </div>

          <div className="p-2 px-5 font-bold text-lg">
            <label className="flex justify-between">
              Date:
              <input
                className="w-3/6 p-1"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="p-2 px-5 font-bold text-lg">
            <label className="flex justify-between">
              Start/End:
              <TimeSelector
                clockIn={formData.startTime}
                clockOut={formData.endTime}
                onChange={handleChange}
                onClockInChange={(value) =>
                  handleTimeChange('startTime', value)
                }
                onClockOutChange={(value) => handleTimeChange('endTime', value)}
              />
            </label>
          </div>

          <div className="p-2 px-5 font-bold text-lg">
            <label className="flex justify-between">
              Maneuver:
              <select
                className="w-3/6 p-1"
                name="maneuver"
                value={formData.maneuver || ''}
                onChange={handleChange}
                required>
                <option value="" disabled>
                  Maneuver
                </option>
                <option value="Pre Trip">Pre Trip</option>
                <option value="Straight Back">Straight Back</option>
                <option value="Off Set">Off set</option>
                <option value="Road">Road</option>
              </select>
            </label>
          </div>

          <div className="w-full flex justify-center p-2">
            <button
              type="submit"
              className="w-4/6 p-1 font-bold text-lg bg-blue-600 rounded-md text-white hover:bg-blue-800 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionForm;
