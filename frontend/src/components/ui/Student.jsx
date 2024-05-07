import React from "react";
import { useState } from "react";
import ScheduleStudent from "./ScheduleStudentModal";
import EditStudentModal from "./EditStudentModal";

const Student = ({ student, toast, refresh }) => {
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
      return "bg-red-600 w-3/6 rounded-lg px-1";
    } else if (differenceInDays <= 7) {
      return "bg-orange-500 w-3/6 rounded-lg px-1";
    } else {
      return ""; // No special class
    }
  };

  return (
    <div className={`flex flex-col p-2 my-1 bg-green-500 rounded-lg`}>
      <button
        onClick={() => {
          setAccordionOpen(!accordionOpen);
        }}
        className="flex justify-between w-full"
      >
        <span className="text-sm md:text-2xl text-black font-bold ">
          {student.firstName +
            " " +
            student.lastName +
            " | Class " +
            student.clas +
            " | " +
            student.transmission}
        </span>

        <svg
          className="fill-black shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className={`overflow-hidden font-bold text-sm md:text-xl`}>
          {
            <div className="flex flex-col mt-4">
              <p>DOB: {student.DOB}</p>
              <p>Driver's License Number: {student.DLnumber}</p>
              <p>Phone: {student.phone}</p>
              <p>Email: {student.email}</p>
              <p className={getPermitExpiryColor()}>
                Permit Expiry Date: {student.permitExpiryDate}
              </p>

              <div className="flex py-2">
                <ScheduleStudent student={student} toast={toast} />
                <EditStudentModal info={student} refresh={refresh} />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Student;
