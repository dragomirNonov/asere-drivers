import DynamicBackgroundDiv from '../../components/common/DynamicBackgroundDiv';
import Navbar from '../../components/studentUI/Navbar';
import UserInfo from '../../components/common/UserInfo';
import SessionForm from '../../components/studentUI/SessionForm';
import StudentHours from '../../components/studentUI/StudentHours';

import { useState, useEffect } from 'react';
import { decodeToken } from '../../utils/utils';

import truckImage from '../../assets/truck3.png';

const StudentPage = () => {
  const [userId, setUserId] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
    setUserId(decodedToken.userId);
  }, []);

  const onAddSession = () => {
    setToggle((toggle) => !toggle);
  };

  return (
    <div>
      <DynamicBackgroundDiv backgroundImage={truckImage}>
        <Navbar />
        <UserInfo />
        {userId && (
          <>
            <SessionForm userId={userId} onAddSession={onAddSession} />
            <StudentHours userId={userId} toggle={toggle} />
          </>
        )}
      </DynamicBackgroundDiv>
    </div>
  );
};

export default StudentPage;
