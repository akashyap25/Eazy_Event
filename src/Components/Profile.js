import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jsonwebtoken/decode';

const Profile = () => {
  const [cookies] = useCookies(['jwt']);
  const [userId, setUserId] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    if (cookies.jwt) {
      const decoded = jwt_decode(cookies.jwt);
      setUserId(decoded.id);
    }
  }, [cookies.jwt]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${userId}`);
        setUserProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${userId}`);
        
        setCreatedEvents(response.data.event);
      } catch (error) {
        console.error('Error fetching created events:', error);
      }
    };

    if (userId) {
      fetchCreatedEvents();
    }
  }, [userId]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/eventRegistrations/${userId}`);
        setRegisteredEvents(response.data.eventRegistration);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    if (userId) {
      fetchRegisteredEvents();
    }
  }, [userId]);

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          {/* Display other profile details as needed */}
        </div>
      )}
      <h2>Events Created By User</h2>
      {createdEvents?.length > 0 ? (
        <ul>
          {createdEvents?.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      ) : (
        <p>No events created by the user.</p>
      )}
      <h2>Events Registered By User</h2>
      {registeredEvents.length > 0 ? (
        <ul>
          {registeredEvents?.map(registration => (
            <li key={registration.eventId}>{registration.eventTitle}</li>
          ))}
        </ul>
      ) : (
        <p>No events registered by the user.</p>
      )}
    </div>
  );
};

export default Profile;
