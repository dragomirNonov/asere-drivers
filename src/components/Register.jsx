import { useState } from "react";
import arrow from "../assets/arrow.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [transmission, setTransmission] = useState("");
  const [clas, setClas] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:");
    console.log(firstname);
    console.log(lastname);
    console.log(phone);
    console.log(email);
    console.log(transmission);
    console.log(clas);
    console.log(username);
    console.log(password);
  };

  return (
    <div className="bg-gray-700 flex flex-col items-center w-auto h-screen  ">
      <div className="bg-gray-900 shadow-md rounded-md p-4 md:mt-20 flex flex-col items-center w-full h-screen md:h-max md:w-2/6">
        <h2 className="text-white font-bold p-2 text-3xl">SIGN UP</h2>
        <form onSubmit={handleSubmit} className=" w-full  p-2">
          <div className="md:flex md:flex-row">
            <div className="p-2 flex flex-col md:w-1/2 text-gray-500 ">
              <label>Firsst Name </label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              />
            </div>
            <div className="p-2 flex flex-col md:w-1/2 text-gray-500">
              <label>Last Name</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              />
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-2 flex flex-col md:w-1/2 text-gray-500 ">
              <label>Phone </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              />
            </div>
            <div className="p-2 flex flex-col md:w-1/2 text-gray-500">
              <label>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              />
            </div>
          </div>
          <div className="md:flex flex-row">
            <div className="p-2 flex flex-col md:w-1/2 text-gray-500">
              <label>Transmission</label>
              {/* Replace input with a select element for Transmission */}
              <select
                id="transmission"
                value={transmission}
                onChange={(event) => setTransmission(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              >
                <option value="" disabled>
                  Select transmission
                </option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="p-2 flex flex-col md:w-1/2 text-gray-500">
              <label>Class</label>
              {/* Replace input with a select element for Class */}
              <select
                id="class"
                value={clas}
                onChange={(event) => setClas(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              >
                <option value="" disabled>
                  Select class
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>

          <div className="md:flex flex-row">
            <div className="p-2 flex flex-col md:w-1/2 text-gray-500 ">
              <label>Username </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              />
            </div>
            <div className="p-2 flex flex-col md:w-1/2 text-gray-500">
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="p-1 rounded-md bg-gray-500 text-white"
              />
            </div>
          </div>

          <div className="flex">
            <p className="text-gray-500 p-1">Already have an account? </p>
            <a
              href="/login"
              className="text-gray-500 ml-auto hover:text-white hover:rounded-md p-1"
            >
              Login{" "}
            </a>
          </div>

          <button
            type="submit"
            className="text-white font-bold p-2 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg mt-4"
          >
            Register
          </button>
        </form>
        <Link to="/">
          <img
            src={arrow}
            className="w-10 mt-2 hover:p-3 p-2 rounded"
            alt="Arrow"
            id="home"
            style={{ filter: "invert(1)" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Register;
