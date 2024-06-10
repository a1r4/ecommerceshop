import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/app/redux/hooks';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null); // State to store user data
  const userData = useAppSelector((state) => state.userReducer); // Get user ID from Redux store

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/get_user/${userData._id}`); // Fetch user data by ID
        const users = response.data;
        setUser(users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userData._id]); // Fetch user data whenever user ID changes

  return (
    <div>
      <h1>Profile Page</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
