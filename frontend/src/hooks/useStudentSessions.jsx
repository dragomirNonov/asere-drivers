import { useState } from 'react';

import sessionServices from '../services/sessions';
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
      const response = await sessionServices.getSessionsByStudentId(userId);
      const formattedSessions = formatSessions(response.data);
      const calculatedHours = calculateHours(formattedSessions);

      setSessions({
        preTrip: formattedSessions.filter((s) => s.maneuver === 'Pre Trip'),
        straightBack: formattedSessions.filter(
          (s) => s.maneuver === 'Straight Back',
        ),
        offSet: formattedSessions.filter((s) => s.maneuver === 'Off Set'),
        road: formattedSessions.filter((s) => s.maneuver === 'Road'),
      });
      setHours(calculatedHours);
    } catch (error) {
      toast.error('Failed to fetch sessions');
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

const calculateHours = (sessions) => {
  let preTrip = 0;
  let driving = 0;

  sessions.forEach((session) => {
    if (session.duration) {
      const duration = parseFloat(session.duration);
      if (session.maneuver === 'Pre Trip') {
        preTrip += duration;
      } else if (
        ['Straight Back', 'Off Set', 'Road'].includes(session.maneuver)
      ) {
        driving += duration;
      }
    }
  });

  const total = preTrip + driving;

  return {
    preTrip: preTrip.toFixed(2),
    driving: driving.toFixed(2),
    total: total.toFixed(2),
  };
};

export default useStudentSessions;
