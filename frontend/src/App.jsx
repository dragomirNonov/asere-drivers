import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/admin/AdminPage';
import StudentPage from './pages/student/StudentPage';
import InstructorPage from './pages/instructor/InstructorPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Route for the HomePage component */}
          <Route path="/" element={<HomePage />} />
          {/* Route for the Login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route for the Register page */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Route for the Admin page */}
          <Route path="/adminUI/*" element={<AdminPage />} />
          {/* Route for the Student page */}
          <Route path="/studentui/*" element={<StudentPage />} />
          {/* Route for the Instructor page */}
          <Route path="/instructorui/*" element={<InstructorPage />} />
        </Routes>
      </div>
    </Router>
  );
}
