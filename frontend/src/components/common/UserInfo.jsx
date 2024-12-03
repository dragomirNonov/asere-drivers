import { useState, useEffect } from 'react';
import userService from '../../services/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }

        const decodedToken = decodeToken(token);

        if (decodedToken?.userId) {
          const response = await userService.getUserById(decodedToken.userId);
          setUser(response.user);
        } else {
          setError('Invalid token format');
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setError(error.message);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
          <div className="h-4 bg-gray-600 rounded w-48"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-4 text-red-400 bg-red-900/20 rounded-lg border border-red-500/50">
        <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-2" />
        <span>Error: {error}</span>
      </div>
    );
  }

  return user ? (
    <div className=" p-4">
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0">
          <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-blue-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col text-white">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold truncate">
                {user.firstName} {user.lastName}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-200">
                {user.Role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default UserInfo;
