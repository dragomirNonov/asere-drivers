import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import truck from './assets/truck.jpg';
import AboutUS from './components/AboutUs';
import ContactUs from './components/ContactUS';
import FAQs from './components/FAQs';
import Gallery from './components/Gallery';
import GoogleMap from './components/GoogleMap';
import Info from './components/Info';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
// UI Imports
import InstructorAppointments from './components/instructorUI/Appointments';
import InstructorStudents from './components/instructorUI/Students';
import InstructorUiNavbar from './components/instructorUI/instructorUiNavbar';
import Session from './components/studentUI/Session';
import StudentUiNavbar from './components/studentUI/studentUiNavbar';
import Appointments from './components/ui/Appointments';
import Students from './components/ui/Students';
import UserInfo from './components/ui/UserInfo';
//Student UI Imports
//Instructor UI Imports
import UiNavbar from './components/ui/uiNavbar';

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

function StudentUI() {
    return (
        <div className="bg-gray-500 pb-10  ">
            <StudentUiNavbar />
            <UserInfo />
            <Session />
        </div>
    );
}

function InstructorUI() {
    return (
        <div className="bg-gray-500 pb-10">
            <InstructorUiNavbar />
            <UserInfo />
            <Routes>
                <Route path="students" element={<InstructorStudents />} />
                <Route
                    path="appointments"
                    element={<InstructorAppointments />}
                />
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
                    {/* Route for the Student page */}
                    <Route path="/studentui/*" element={<StudentUI />} />
                    {/* Route for the Instructor page */}
                    <Route path="/instructorui/*" element={<InstructorUI />} />
                </Routes>
            </div>
        </Router>
    );
}
