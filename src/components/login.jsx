import { useState } from "react";
import arrow from "../assets/arrow.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:");
    console.log(username);
    console.log(password);
  };

  return (
    <div className="bg-gray-700 flex flex-col items-center w-auto h-screen  ">
      <div className="bg-gray-900 shadow-md rounded-md p-4 md:mt-20 flex flex-col items-center w-full h-screen md:h-max md:w-1/3">
        <h2 className="text-white font-bold p-2 text-3xl">SIGN IN</h2>
        <form onSubmit={handleSubmit} className=" w-full  p-2">
          <div className="py-2 flex flex-col text-gray-500 ">
            <label>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="p-1 rounded-md bg-gray-500 text-white"
            />
          </div>
          <div className="py-2 flex flex-col text-gray-500">
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
          <div className="flex">
            <p className="text-gray-500 p-1">Dont have an account? </p>
            <a
              href="/register"
              className="text-gray-500 ml-auto hover:text-white hover:rounded-md p-1"
            >
              Register{" "}
            </a>
          </div>

          <button
            type="submit"
            className="text-white font-bold p-2 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg mt-4"
          >
            Login
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

export default Login;
