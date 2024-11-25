import { useState } from 'react';

import EditStudentModal from './EditStudentModal';
import ScheduleStudent from './ScheduleStudentModal';
import StudentHoursModal from './StudentHoursModal';

import { formatPhoneNumber } from '../../../utils/utils';

const Student = ({ student, toast, refresh }) => {
  const [showStudentHours, setShowStudentHours] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  // Function to determine the color class based on permitExpiryDate
  const getPermitExpiryColor = () => {
    const expiryDate = new Date(student.permitExpiryDate);
    const currentDate = new Date();

    // Calculate difference in milliseconds between expiryDate and currentDate
    const differenceInTime = expiryDate - currentDate;

    // Convert difference to days
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // Apply different classes based on difference in days
    if (differenceInDays < 0) {
      return 'bg-red-600 w-max rounded-lg px-1';
    } else if (differenceInDays <= 7) {
      return 'bg-orange-500 w-max rounded-lg px-1';
    } else {
      return ''; // No special class
    }
  };

  const onStudenHoursVisibilityChange = (visibility) => {
    setShowStudentHours(visibility);
  };

  const studentHeading = `${student.firstName} ${student.lastName} | Class ${student.clas}`;

  return (
    <div className={`flex flex-col p-2 my-1 bg-green-500 rounded-lg`}>
      <button
        onClick={() => {
          setAccordionOpen(!accordionOpen);
        }}
        className="flex justify-between w-full">
        <span className="flex justify-between text-sm md:text-2xl text-black font-bold uppercase w-full">
          <span className="pr-6">{`${student.firstName} ${student.lastName}`}</span>
          <span>{`Class ${student.clas}`}</span>
        </span>

        <svg
          className="fill-black shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && '!rotate-180'
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && '!rotate-180'
            }`}
          />
        </svg>
      </button>
      {accordionOpen && (
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className={`overflow-hidden font-bold text-sm md:text-xl`}>
            <div className="flex flex-col mt-4">
              <p>
                DOB: <span className="font-medium">{student.DOB}</span>
              </p>
              <p>
                Driver&#39;s License #:{' '}
                <span className="font-medium">{student.DLnumber}</span>
              </p>
              <p>
                Phone:{' '}
                <span className="font-medium">
                  {formatPhoneNumber(student.phone)}
                </span>
              </p>
              <p>
                Email: <span className="font-medium">{student.email}</span>
              </p>
              <p className={getPermitExpiryColor()}>
                Permit Expiry Date:{' '}
                <span className="font-medium">{student.permitExpiryDate}</span>
              </p>

              <div className="flex py-2">
                <ScheduleStudent student={student} toast={toast} />
                <EditStudentModal info={student} refresh={refresh} />
                <button
                  className="bg-gray-800 text-white  uppercase text-sm md:px-2 px-4 py-2 rounded-lg shadow
                  hover:shadow-lg hover:bg-gray-700 outline-none focus:outline-none ml-auto mr-1  ease-linear transition-all 
                  duration-150 md:w-1/6"
                  type="button"
                  onClick={() => setShowStudentHours(true)}>
                  Hours
                </button>
              </div>
            </div>
          </div>
          {showStudentHours && (
            <StudentHoursModal
              info={student}
              refresh={refresh}
              show={showStudentHours}
              studentHeading={studentHeading}
              onVisibilityChange={onStudenHoursVisibilityChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Student;
