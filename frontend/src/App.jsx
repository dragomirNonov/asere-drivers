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
// UI Imports
import UiNavbar from "./components/ui/uiNavbar";
import Students from "./components/ui/Students";
import Appointments from "./components/ui/Appointments";
import UserInfo from "./components/ui/UserInfo";

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
    <div className="bg-gray-500 pb-10  ">
      <UiNavbar />
      <UserInfo />
      <Routes>
        <Route path="students" element={<Students />} />
        <Route path="appointments" element={<Appointments />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col">
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
