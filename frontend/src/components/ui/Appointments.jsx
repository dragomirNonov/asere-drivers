const Appointments = () => {
  return (
    <div className="flex flex-col items-center  mt-4">
      <div className=" m-4">
        <a
          className="text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg mt-4"
          href="/ui/addappointment"
        >
          Make a New Appointment
        </a>
      </div>
      <div className="mt-10">
        <p>Appointment</p>
        <p>Appointment</p>
        <p>Appointment</p>
        <p>Appointment</p>
        <p>Appointment</p>
      </div>
    </div>
  );
};

export default Appointments;
