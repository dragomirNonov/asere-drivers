import DynamicBackgroundDiv from '../../components/common/DynamicBackgroundDiv';
import Navbar from '../../components/adminUI/Navbar';
import UserInfo from '../../components/common/UserInfo';
import StudentsPage from './StudentsPage';
import AppointmentsPage from './AppointmentsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import truckImage from '../../assets/truck3.png';

const AdminPage = () => {
  return (
    <div>
      <DynamicBackgroundDiv backgroundImage={truckImage}>
        <Navbar />
        <UserInfo />
        <Routes>
          <Route path="students" element={<StudentsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
        </Routes>
      </DynamicBackgroundDiv>
    </div>
  );
};

export default AdminPage;
