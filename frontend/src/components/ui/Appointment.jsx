import { useState } from "react";
import EditAppModal from "./EditAppModal";

const Appointment = (props) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div
      className={`flex  flex-col p-2 my-1 ${
        props.pr === "real"
          ? "bg-green-500"
          : props.pr === "placeholder"
          ? "bg-yellow-400"
          : props.pr === "header"
          ? "bg-slate-600"
          : ""
      }`}
    >
      <button
        onClick={() => {
          setAccordionOpen(!accordionOpen);
        }}
        className="flex justify-between w-full"
      >
        <span className="text-sm md:text-lg text-black font-bold">
          {props.firstName +
            " " +
            props.lastName +
            " " +
            " | " +
            props.date +
            " | " +
            props.location +
            " | " +
            props.truck +
            " " +
            props.transmission}
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
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className=" overflow-hidden text-black font-bold ">
          {
            <div className="flex flex-col mt-4">
              <p>DOB: {props.DOB}</p>
              <p>Driver's License Number: {props.DLnumber}</p>
              <p>Phone: {props.phone}</p>
              <p>Email: {props.email}</p>
              <p>Permit Expiry Date: {props.permitExpiryDate}</p>

              <EditAppModal info={props} deleteApp={props.deleteApp} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Appointment;
