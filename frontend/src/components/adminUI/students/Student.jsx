import { useState } from 'react';
import EditStudentModal from './EditStudentModal';
import ScheduleStudent from './ScheduleStudentModal';
import StudentHoursModal from './StudentHoursModal';
import { formatPhoneNumber } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faIdCard,
  faChevronDown,
  faClock,
  faGraduationCap,
  faBirthdayCake,
  faCalendarAlt,
  faPencilAlt,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../utils/utils';

const Student = ({ student, toast, refresh }) => {
  const [showStudentHours, setShowStudentHours] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const getPermitStatus = () => {
    const expiryDate = new Date(student.permitExpiryDate);
    const currentDate = new Date();
    const differenceInTime = expiryDate - currentDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays < 0) {
      return {
        containerClass: 'bg-red-100 text-red-700 border border-red-300',
        text: 'Expired',
      };
    } else if (differenceInDays <= 7) {
      return {
        containerClass:
          'bg-orange-100 text-orange-700 border border-orange-300',
        text: 'Expiring Soon',
      };
    }
    return {
      containerClass: 'bg-green-100 text-green-700 border border-green-300',
      text: 'Valid',
    };
  };

  const permitStatus = getPermitStatus();
  const studentHeading = `${student.firstName} ${student.lastName} | Class ${student.clas}`;

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
            <span className="text-xl font-bold text-black">
              {student.firstName} {student.lastName}
            </span>
            <span className="text-sm text-black font-medium">
              Class {student.clas}
            </span>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-5 h-5 text-white transition-transform duration-200 ${
            accordionOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          accordionOpen ? 'max-h-[500px]' : 'max-h-0'
        } overflow-hidden`}>
        <div className="p-4 bg-white space-y-3">
          <div className="flex items-center space-x-3 text-black">
            <FontAwesomeIcon icon={faBirthdayCake} className="w-4 h-4" />
            <span>DOB: {formatDate(student.DOB)}</span>
          </div>

          <div className="flex items-center space-x-3 text-black">
            <FontAwesomeIcon icon={faIdCard} className="w-4 h-4" />
            <span>Driver's License #: {student.DLnumber}</span>
          </div>

          <div className="flex items-center space-x-3 text-black">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
            <span>{formatPhoneNumber(student.phone)}</span>
          </div>

          <div className="flex items-center space-x-3 text-black">
            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
            <span>{student.email}</span>
          </div>

          <div
            className={`flex items-center space-x-3 p-3 rounded-lg ${permitStatus.containerClass}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Permit Status: {permitStatus.text}
              </span>
              <span className="text-sm">
                Expires: {formatDate(student.permitExpiryDate)}
              </span>
            </div>
          </div>

          <div className="flex space-x-2 pt-3">
            <ScheduleStudent student={student} toast={toast} />
            <EditStudentModal info={student} refresh={refresh} />
            <button
              className="flex items-center justify-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-150 ml-auto"
              onClick={() => setShowStudentHours(true)}>
              <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
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
          onVisibilityChange={(visibility) => setShowStudentHours(visibility)}
        />
      )}
    </div>
  );
};

export default Student;
