import { useState } from 'react';

import sessionService from '../services/sessions.js';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/utils.js';

const useStudentSessions = (userId) => {
  const [sessions, setSessions] = useState({
    preTrip: [],
    straightBack: [],
    offSet: [],
    road: [],
  });
  const [hours, setHours] = useState({ preTrip: 0, driving: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await sessionService.getSessionsByStudentId(userId);
      const formattedSessions = formatSessions(response.data.sessions);
      const totalHours = response.data.totalHours;

      setSessions({
        preTrip: formattedSessions.filter((s) => s.maneuver === 'Pre Trip'),
        straightBack: formattedSessions.filter(
          (s) => s.maneuver === 'Straight Back',
        ),
        offSet: formattedSessions.filter((s) => s.maneuver === 'Off Set'),
        road: formattedSessions.filter((s) => s.maneuver === 'Road'),
      });

      setHours({
        preTrip: totalHours.preTrip,
        driving: totalHours.driving,
        total: totalHours.total,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sessions, hours, isLoading, fetchSessions };
};

const formatSessions = (sessions) => {
  const formatedSessions = sessions?.map((x) => {
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

  return formatedSessions;
};

export default useStudentSessions;
