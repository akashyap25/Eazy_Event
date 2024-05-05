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
  const [showAllEvents, setShowAllEvents] = useState(false);

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
        const response = await axios.get(`http://localhost:3000/events/organizer/${userId}`);
        // Reverse the order of events by event creation time
        const reversedEvents = response.data.events.reverse();
        setCreatedEvents(reversedEvents);
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
    <div className="container mx-auto p-8">
      <h2 className="text-2xl mb-4">User Profile</h2>
      <div className="border rounded p-4 mb-8">
        {userProfile && (
          <div>
            <p className='text-lg font-semibold p-1'>Name: {userProfile.firstName + " " + userProfile.lastName}</p>
            <p className='text-lg font-semibold p-1'>Email: {userProfile.email}</p>
            <p className='text-lg font-semibold p-1'>Username: {userProfile.username}</p>
            <p className='text-lg font-semibold p-1'>Dob: {userProfile.dob.slice(0,10)}</p>
            <p className='text-lg font-semibold p-1'>Mobile no. {userProfile.mobileNumber}</p>
          </div>
        )}
      </div>
      <h2 className="text-2xl mb-4">Events Created By User</h2>
      <div className="border rounded shadow p-4 mb-8">
        {createdEvents?.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showAllEvents
              ? createdEvents.map(event => (
                <li key={event.id} className="border p-4">
                  <img src={event.imageUrl} className='h-48 w-full object-cover mb-4' alt={event.title} />
                  <p className='text-lg font-medium mb-2'>Title: {event.title}</p>
                  <p className='text-lg font-medium mb-2'>Description: {event.description}</p>
                  <p className='text-lg font-medium mb-2'>Location: {event.location}</p>
                  <p className='text-lg font-medium mb-2'>Start Date: {event.startDate.slice(0,10)}</p>
                </li>
                ))
              : createdEvents.slice(0, 6).map(event => (
                  <li key={event.id} className="border p-4">
                    <img src={event.imageUrl} className='h-48 w-full object-cover mb-4' alt={event.title} />
                    <p className='text-lg font-medium mb-2'>Title: {event.title}</p>
                    <p className='text-lg font-medium mb-2'>Description: {event.description}</p>
                    <p className='text-lg font-medium mb-2'>Location: {event.location}</p>
                    <p className='text-lg font-medium mb-2'>Start Date: {event.startDate.slice(0,10)}</p>
                  </li>
                ))}
          </ul>
        ) : (
          <p>No events created by the user.</p>
        )}
        {showAllEvents
          ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" onClick={() => setShowAllEvents(false)}>Show Less</button>
          : createdEvents.length > 6 && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowAllEvents(true)}>Show All</button>
        }
      </div>
      <h2 className="text-2xl mb-4">Events Registered By User</h2>
<div className="border rounded shadow p-4 mb-8">
  {registeredEvents?.length > 0 ? (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {showAllEvents
        ? registeredEvents.map(registration => (
          <li key={registration.eventId} className="border p-4">
            <p className='text-lg font-medium mb-2'>Title: {registration.title}</p>
            <p className='text-lg font-medium mb-2'>Description: {registration.description}</p>
            <p className='text-lg font-medium mb-2'>Location: {registration.location}</p>
            <p className='text-lg font-medium mb-2'>Start Date: {registration.startDate.slice(0,10)}</p>
          </li>
        ))
        : registeredEvents.slice(0, 6).map(registration => (
          <li key={registration.eventId} className="border p-4">
            <p className='text-lg font-medium mb-2'>Title: {registration.title}</p>
            <p className='text-lg font-medium mb-2'>Description: {registration.description}</p>
            <p className='text-lg font-medium mb-2'>Location: {registration.location}</p>
            <p className='text-lg font-medium mb-2'>Start Date: {registration.startDate.slice(0,10)}</p>
          </li>
        ))}
    </ul>
  ) : (
    <p>No events registered by the user.</p>
  )}
  {registeredEvents.length > 6 && (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => setShowAllEvents(!showAllEvents)}>
      {showAllEvents ? "Show Less" : "Show All"}
    </button>
  )}
</div>

    </div>
  );
};

export default Profile;
