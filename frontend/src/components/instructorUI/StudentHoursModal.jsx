import React from 'react';
import { useState, useEffect } from 'react';

import sessionServices from '../../services/sessions';

const StudentHoursModal = (props) => {
    const userId = props.info._id;
    const [showModal, setShowModal] = React.useState(false);

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
    }, [userId]); // Re-fetch sessions every time userId or formSubmitted changes

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
        <>
            <button
                // className="edit-button ml-auto px-4 py-1  bg-blue-600  hover:bg-yellow-600 hover:text-white rounded-lg hover:border-collapse"
                className="bg-orange-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-2 py-2 rounded-lg shadow hover:shadow-lg hover:bg-orange-700 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all duration-150 md:w-1/6"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Hours
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative md:w-2/6 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white">
                                    <h3 className="text-3xl font-semibold">
                                        Student Hours
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto  overflow-y-auto max-h-[70vh]">
                                    <div className="popup">
                                        <div className="p-5">
                                            {sessions.length === 0 ? (
                                                <p>No sessions found.</p>
                                            ) : (
                                                <div className="">
                                                    <div className="">
                                                        <p className="text-xl font-bold">
                                                            Pre Trip
                                                        </p>
                                                        {/* Pre Trip*/}
                                                        <div className="flex flex-row ">
                                                            {/* Date Column */}
                                                            <div className="m-2">
                                                                <ul>
                                                                    <div className="md:text-xl font-bold">
                                                                        Date:{' '}
                                                                    </div>
                                                                    {sessions
                                                                        .filter(
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Pre Trip',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatDate(
                                                                                        session.date,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Pre Trip',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedIn,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Pre Trip',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedOut,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>

                                                            <div className="m-2">
                                                                <ul>
                                                                    <div className="md:text-xl font-bold">
                                                                        Duration:{' '}
                                                                    </div>
                                                                    {sessions
                                                                        .filter(
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Pre Trip',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="text-sm md:text-lg font-bold"
                                                                                >
                                                                                    {
                                                                                        session.duration
                                                                                    }
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="">
                                                        <p className="text-xl font-bold">
                                                            Straight Back
                                                        </p>
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Straight Back',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatDate(
                                                                                        session.date,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Straight Back',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedIn,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Straight Back',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedOut,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>

                                                            <div className="m-2">
                                                                <ul>
                                                                    <div className="md:text-xl font-bold">
                                                                        Duration:{' '}
                                                                    </div>
                                                                    {sessions
                                                                        .filter(
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Straight Back',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="text-sm md:text-lg font-bold"
                                                                                >
                                                                                    {
                                                                                        session.duration
                                                                                    }
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-xl font-bold">
                                                            Off Set
                                                        </p>
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Off Set',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatDate(
                                                                                        session.date,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Off Set',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedIn,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Off Set',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedOut,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>

                                                            <div className="m-2">
                                                                <ul>
                                                                    <div className="md:text-xl font-bold">
                                                                        Duration:{' '}
                                                                    </div>
                                                                    {sessions
                                                                        .filter(
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Off Set',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="text-sm md:text-lg font-bold"
                                                                                >
                                                                                    {
                                                                                        session.duration
                                                                                    }
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-xl font-bold">
                                                            Road
                                                        </p>
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Road',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatDate(
                                                                                        session.date,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Road',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedIn,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
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
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Road',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="md:text-lg text-sm font-bold"
                                                                                >
                                                                                    {formatTime(
                                                                                        session.clockedOut,
                                                                                    )}
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>

                                                            <div className="m-2">
                                                                <ul>
                                                                    <div className="md:text-xl font-bold">
                                                                        Duration:{' '}
                                                                    </div>
                                                                    {sessions
                                                                        .filter(
                                                                            (
                                                                                session,
                                                                            ) =>
                                                                                session.maneuver ===
                                                                                'Road',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                session,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        session._id
                                                                                    }
                                                                                    className="text-sm md:text-lg font-bold"
                                                                                >
                                                                                    {
                                                                                        session.duration
                                                                                    }
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Total Hours */}
                                            <p>
                                                <strong>Pre Trip Hours:</strong>{' '}
                                                {hours.preTrip}
                                            </p>
                                            <p>
                                                <strong>Driving Hours:</strong>{' '}
                                                {hours.driving}
                                            </p>
                                            <p>
                                                <strong>Total Hours:</strong>{' '}
                                                {hours.total}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white bg-red-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-700"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default StudentHoursModal;
