import userService from "../../services/users";

import React, { useState, useEffect } from "react";

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    // Decode token to get user ID
    const decodedToken = decodeToken(token);

    // Fetch user by ID using the decoded token
    if (decodedToken && decodedToken.userId) {
      userService
        .getUserById(decodedToken.userId)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  const decodeToken = (token) => {
    try {
      // Decode token
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  return (
    <div>
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
