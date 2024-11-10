import sessionServices from "../../services/sessions";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import StudentHours from "./StudentHours";
import TimePicker from "./TimePicker";

const Session = () => {
  const [user, setUser] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const clockedIn = () => toast.success("You have Clocked-In");
  const initialFormData = {
    date: "",
    startTime: "",
    endTime: "",
    maneuver: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    setUser(decodedToken);
  }, []);

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

    const durationInMilliseconds = endDateTime - startDateTime;
    const durationInHours = durationInMilliseconds / 1000 / 60 / 60;
    const duration = parseFloat(durationInHours.toFixed(2));

    const sessionObj = {
      userId: user?.userId,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      maneuver: formData.maneuver,
      duration: duration,
    };

    sessionServices.createSession(sessionObj).then(() => {
      clockedIn();
      setFormData(initialFormData);
      setFormSubmitted((prev) => !prev);
    });

    console.log(`Duration: ${duration} Hours`);
  };

  return (
    <div className="flex flex-col ">
      <div className="mt-2  w-full md:w-1/6 md:m-auto md:mt-5 bg-slate-200 md:rounded-lg ">
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-800 font-bold text-lg text-white md:rounded-lg p-1 px-3 mb-2">
            <label>Time Form</label>
          </div>

          <div className="p-2 px-5 font-bold text-lg">
            <label className="flex justify-between">
              Date:
              <input
                className="w-3/6 p-1"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="p-2 px-5 font-bold text-lg">
            <label className="flex justify-between">
              Start Time:
              <TimePicker
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="p-2 px-5 font-bold text-lg">
            <label className="flex justify-between">
              End Time:
              <TimePicker
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="p-2 px-5 font-bold text-lg">
            <label className="flex justify-between">
              Maneuver:
              <select
                className="w-3/6 p-1"
                name="maneuver"
                value={formData.maneuver || ""}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Maneuver
                </option>
                <option value="Pre Trip">Pre Trip</option>
                <option value="Straight Back">Straight Back</option>
                <option value="Off Set">Off set</option>
                <option value="Road">Road</option>
              </select>
            </label>
          </div>

          <div className="w-full flex justify-center p-2">
            <button
              type="submit"
              className="w-4/6 p-1 font-bold text-lg bg-blue-600 rounded-md text-white hover:bg-blue-800 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      {user && (
        <StudentHours userId={user.userId} formSubmitted={formSubmitted} />
      )}
    </div>
  );
};

export default Session;
