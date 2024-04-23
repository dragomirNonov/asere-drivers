const Appointment = (props) => {
  const divStyle = {
    width: "calc(100% / 11)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const pStyle = {
    wordBreak: "break-all",
  };

  return (
    <div
      className={`flex md:flex-row flex-col p-2 ${
        props.pr === "real"
          ? "bg-green-400"
          : props.pr === "placeholder"
          ? "bg-yellow-200"
          : props.pr === "header"
          ? "bg-slate-600"
          : ""
      }`}
    >
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.name}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.DOB}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.DLnumber}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.phone}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.email}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.location}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.date}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.time}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.truck}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.transmission}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center">
        <p className="font-bold text-sm px-1" style={pStyle}>
          {props.permitExpiryDate}
        </p>
      </div>
      <div className="md:w-1/12 flex justify-center items-center ">
        <a
          href="#"
          className="font-bold text-sm  p-2 rounded-lg hover:bg-gray-200 bg-slate-300 w-full flex justify-center"
        >
          Edit
        </a>
      </div>
    </div>
  );
};

export default Appointment;
