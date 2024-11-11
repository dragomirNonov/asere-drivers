import { useEffect, useState } from 'react';

import sessionServices from '../../services/sessions';

const StudentHours = ({ formSubmitted, userId }) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        if (userId) {
            // Fetch sessions for the given user ID
            sessionServices
                .getSessionsByStudentId(userId)
                .then((response) => {
                    // Sort sessions by date (most recent to least recent)
                    const sortedSessions = response.data.sort(
                        (a, b) => new Date(b.date) - new Date(a.date),
                    );
                    setSessions(sortedSessions);
                })
                .catch((error) => {
                    console.error('Error fetching sessions:', error);
                });
        }
    }, [userId, formSubmitted]); // Re-fetch sessions every time userId or formSubmitted changes

    // Function to format dates in MM/DD/YYYY format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${month}/${day}/${year}`;
    };

    // Function to format time from 24-hour to 12-hour AM/PM format
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        let formattedTime = '';

        if (parseInt(hours, 10) === 0) {
            formattedTime = `12:${minutes} `; // Midnight case
        } else if (parseInt(hours, 10) === 12) {
            formattedTime = `12:${minutes} `; // Noon case
        } else if (parseInt(hours, 10) > 12) {
            formattedTime = `${parseInt(hours, 10) - 12}:${minutes} `; // PM case
        } else {
            formattedTime = `${hours}:${minutes} `; // AM case
        }

        return formattedTime;
    };

    // Function to calculate total hours across all sessions
    const calculateHours = () => {
        let preTrip = 0;
        let driving = 0;

        sessions.forEach((session) => {
            if (session.duration) {
                const duration = parseFloat(session.duration);
                if (session.maneuver === 'Pre Trip') {
                    preTrip += duration;
                } else if (
                    ['Straight Back', 'Off Set', 'Road'].includes(
                        session.maneuver,
                    )
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

    const hours = calculateHours();

    return (
        <div className="p-5  ">
            <h1 className="font-bold text-xl flex justify-center md:justify-start md:text-2xl md:mb-3">
                Student Hours
            </h1>

            {sessions.length === 0 ? (
                <p>No sessions found.</p>
            ) : (
                <div className="">
                    {/* ////////////////// */}
                    <div className="">
                        <p className="text-xl font-bold">Pre Trip</p>
                        {/* Straight Back */}
                        <div className="flex flex-row ">
                            {/* Date Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Date:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Pre Trip',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatDate(session.date)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* Start Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Start:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Pre Trip',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedIn)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* End Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        End:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Pre Trip',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedOut)}
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Duration:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Pre Trip',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="text-sm md:text-lg font-bold"
                                            >
                                                {session.duration}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* ///////////////// */}
                    <div className="">
                        <p className="text-xl font-bold">Straight Back</p>
                        {/* Straight Back */}
                        <div className="flex flex-row ">
                            {/* Date Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Date:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver ===
                                                'Straight Back',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatDate(session.date)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* Start Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Start:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver ===
                                                'Straight Back',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedIn)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* End Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        End:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver ===
                                                'Straight Back',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedOut)}
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Duration:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver ===
                                                'Straight Back',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="text-sm md:text-lg font-bold"
                                            >
                                                {session.duration}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-xl font-bold">Off Set</p>
                        {/* Off Set */}
                        <div className="flex flex-row ">
                            {/* Date Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Date:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Off Set',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatDate(session.date)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* Start Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Start:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Off Set',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedIn)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* End Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        End:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Off Set',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedOut)}
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Duration:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Off Set',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="text-sm md:text-lg font-bold"
                                            >
                                                {session.duration}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-xl font-bold">Road</p>
                        {/* Road */}
                        <div className="flex flex-row ">
                            {/* Date Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Date:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Road',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatDate(session.date)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* Start Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Start:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Road',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedIn)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {/* End Time Column */}
                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        End:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Road',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="md:text-lg text-sm font-bold"
                                            >
                                                {formatTime(session.clockedOut)}
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="m-2">
                                <ul>
                                    <div className="md:text-xl font-bold">
                                        Duration:{' '}
                                    </div>
                                    {sessions
                                        .filter(
                                            (session) =>
                                                session.maneuver === 'Road',
                                        )
                                        .map((session) => (
                                            <li
                                                key={session._id}
                                                className="text-sm md:text-lg font-bold"
                                            >
                                                {session.duration}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Total Hours */}
            <p className="mt-4 text-xl">
                {/* <strong>Total Hours:</strong> {calculateTotalHours()} */}
                <p>
                    <strong>Pre Trip Hours:</strong> {hours.preTrip}
                </p>
                <p>
                    <strong>Driving Hours:</strong> {hours.driving}
                </p>
                <p>
                    <strong>Total Hours:</strong> {hours.total}
                </p>
            </p>
        </div>
    );
};

export default StudentHours;
