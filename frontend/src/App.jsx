import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import truck from "./assets/truck.jpg";
import Info from "./components/Info";
import AboutUS from "./components/AboutUs";
import FAQs from "./components/FAQs";
import ContactUs from "./components/ContactUS";
import GoogleMap from "./components/GoogleMap";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

import UiNavbar from "./components/ui/uiNavbar";
import Students from "./components/ui/students";
import Appointments from "./components/ui/Appointments";
import AddAppointment from "./components/ui/addAppointment";

function HomePage() {
  return (
    <div>
      <Navbar />
      <img src={truck} className="w-auto h-100" alt="Truck" id="home" />
      <Info />
      <AboutUS />
      <FAQs />
      <Gallery />
      <ContactUs />
      <GoogleMap />
    </div>
  );
}

function UI() {
  return (
    <div className="bg-gray-500 h-full pb-10">
      <UiNavbar />
      <Routes>
        <Route path="students" element={<Students />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="addappointment" element={<AddAppointment />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-slate-200 flex flex-col">
        <Routes>
          {/* Route for the HomePage component */}
          <Route path="/" element={<HomePage />} />
          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />
          {/* Route for the Register page */}
          <Route path="/register" element={<Register />} />
          {/* Route for the Admin page */}
          <Route path="/ui/*" element={<UI />} />
        </Routes>
      </div>
    </Router>
  );
}
