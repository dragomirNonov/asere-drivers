import { useState, useEffect } from 'react';
import userService from '../../services/users';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve JWT token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }

        // Decode token to get user ID
        const decodedToken = decodeToken(token);
        console.log('Decoded token:', decodedToken); // Debug log

        if (decodedToken && decodedToken.userId) {
          const response = await userService.getUserById(decodedToken.userId);
          console.log('User data response:', response); // Debug log
          setUser(response.user);
        } else {
          setError('Invalid token format');
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">Error: {error}</div>}
      {user ? (
        <div className="flex flex-col text-white font-bold p-2">
          <div className="flex flex-row ">
            <p>Welcome! </p>
            <p className="px-1">{user.firstName}</p>
            <p className="px-1">{user.lastName}</p>
          </div>
          <div className="">
            <p className="px-1">Logged in as a : {user.Role}</p>
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserInfo;
