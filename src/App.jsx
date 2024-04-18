import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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

export default function App() {
  return (
    // <div className="bg-slate-200 flex flex-col ">
    //   <Login />
    //   <Navbar />
    //   <img src={truck} className="w-auto h-100 " alt="Truck" id="home" />
    //   <Info />
    //   <AboutUS />
    //   <FAQs />
    //   <Gallery />
    //   <ContactUs />
    //   <GoogleMap />
    // </div>
    <Router>
      <div className="bg-slate-200 flex flex-col">
        <Routes>
          {/* Route for the HomePage component */}
          <Route path="/" element={<HomePage />} />
          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
