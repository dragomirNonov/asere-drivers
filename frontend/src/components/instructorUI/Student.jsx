import { useState } from 'react';
import StudentHoursModal from './StudentHoursModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faIdCard,
  faChevronDown,
  faGraduationCap,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const Student = ({ student, refresh }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  // Function to determine the color and text based on permitExpiryDate
  const getPermitStatus = () => {
    const expiryDate = new Date(student.permitExpiryDate);
    const currentDate = new Date();
    const differenceInTime = expiryDate - currentDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays < 0) {
      return {
        containerClass: 'bg-red-100 text-red-700 border border-red-300',
        text: 'Expired',
        textClass: 'text-red-700',
      };
    } else if (differenceInDays <= 7) {
      return {
        containerClass:
          'bg-orange-100 text-orange-700 border border-orange-300',
        text: 'Expiring Soon',
        textClass: 'text-orange-700',
      };
    }
    return {
      containerClass: 'bg-green-100 text-green-700 border border-green-300',
      text: 'Valid',
      textClass: 'text-green-700',
    };
  };

  const permitStatus = getPermitStatus();

  return (
    <div className="bg-green-500 rounded-xl shadow-md overflow-hidden my-1 hover:shadow-lg transition-shadow duration-300 w-96">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex items-center justify-between w-full px-4 py-1 hover:bg-green-600 transition-colors duration-200">
        <div className="flex items-center space-x-4">
          <div className="">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="w-6 h-6 text-gray-200"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg  text-black font-bold">
              {student.firstName} {student.lastName}
            </span>
            <span className="text-sm text-black font-semibold ">
              Class {student.clas}
            </span>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            accordionOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          accordionOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden`}>
        <div className="p-4 bg-gray-100 space-y-3">
          {/* Contact Info */}
          <div className="flex items-center px-2 space-x-3 text-black">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
            <span>{student.phone}</span>
          </div>

          <div className="flex items-center px-2 space-x-3 text-black">
            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
            <span>{student.email}</span>
          </div>
          <div className="flex items-center px-2 space-x-3 text-black">
            <FontAwesomeIcon icon={faGear} className="w-4 h-4" />
            <span>{student.transmission}</span>
          </div>

          {/* Permit Status */}
          <div
            className={`flex items-center space-x-3 px-2 p-1rounded-lg ${permitStatus.containerClass}`}>
            <FontAwesomeIcon icon={faIdCard} className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Permit Status: {permitStatus.text}
              </span>
              <span className="text-sm">
                Expires: {dayjs(student.permitExpiryDate).format('MM-DD-YYYY')}
              </span>
            </div>
          </div>

          {/* Hours Modal */}
          <div className="flex items-center ">
            {/* <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-blue-500" /> */}
            <StudentHoursModal info={student} refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
