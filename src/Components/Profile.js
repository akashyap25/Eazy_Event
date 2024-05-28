import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jsonwebtoken/decode';
import { useNavigate } from 'react-router-dom';
import dotenv from 'dotenv';

dotenv.config();

const Profile = () => {
  const [cookies] = useCookies(['jwt']);
  const [userId, setUserId] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const navigate = useNavigate();
  const HOST = process.env.HOST;

  useEffect(() => {
    if (cookies.jwt) {
      const decoded = jwt_decode(cookies.jwt);
      setUserId(decoded.id);
    }
  }, [cookies.jwt]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${HOST}/${userId}`);
        setUserProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, HOST]);

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const response = await axios.get(`${HOST}/events/organizer/${userId}`);
        const reversedEvents = response.data.events.reverse();
        setCreatedEvents(reversedEvents);
      } catch (error) {
        console.error('Error fetching created events:', error);
      }
    };

    if (userId) {
      fetchCreatedEvents();
    }
  }, [userId, HOST]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(`${HOST}/eventRegistrations/${userId}`);
        setRegisteredEvents(response.data.eventRegistration);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    if (userId) {
      fetchRegisteredEvents();
    }
  }, [userId, HOST]);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const response = await axios.get(`${HOST}/events/tasks/${userId}`);
        setAssignedTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching assigned tasks:', error);
      }
    };

    if (userId) {
      fetchAssignedTasks();
    }
  }, [userId, HOST]);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

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
                <li key={event.id} className="border p-4 cursor-pointer" onClick={() => handleEventClick(event.id)}>
                  <img src={event.imageUrl} className='h-48 w-full object-cover mb-4' alt={event.title} />
                  <p className='text-lg font-medium mb-2'>Title: {event.title}</p>
                  <p className='text-lg font-medium mb-2'>Description: {event.description}</p>
                  <p className='text-lg font-medium mb-2'>Location: {event.location}</p>
                  <p className='text-lg font-medium mb-2'>Start Date: {event.startDate.slice(0,10)}</p>
                </li>
              ))
              : createdEvents.slice(0, 6).map(event => (
                <li key={event.id} className="border p-4 cursor-pointer" onClick={() => handleEventClick(event.id)}>
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
                <li key={registration.eventId} className="border p-4 cursor-pointer" onClick={() => handleEventClick(registration.eventId)}>
                  <p className='text-lg font-medium mb-2'>Title: {registration.title}</p>
                  <p className='text-lg font-medium mb-2'>Description: {registration.description}</p>
                  <p className='text-lg font-medium mb-2'>Location: {registration.location}</p>
                  <p className='text-lg font-medium mb-2'>Start Date: {registration.startDate.slice(0,10)}</p>
                </li>
              ))
              : registeredEvents.slice(0, 6).map(registration => (
                <li key={registration.eventId} className="border p-4 cursor-pointer" onClick={() => handleEventClick(registration.eventId)}>
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
        {registeredEvents?.length > 6 && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => setShowAllEvents(!showAllEvents)}>
            {showAllEvents ? "Show Less" : "Show All"}
          </button>
        )}
      </div>

      <h2 className="text-2xl mb-4">Assigned Tasks</h2>
      <div className="border rounded shadow p-4 mb-8">
        {assignedTasks.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedTasks.map(task => (
              <li key={task.id} className={`border p-4 ${task.completed ? 'bg-green-100' : 'bg-red-100'} cursor-pointer`} onClick={() => handleEventClick(task.eventId)}>
                <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                <p className="text-md mb-2">{task.description}</p>
                <p className="text-sm mb-2">{task.completed ? 'Completed' : 'Pending'}</p>
                <p className="text-md mb-2">Event: {task.eventTitle}</p>
                <p className="text-md mb-2">Event Date: {task.eventStartDate.slice(0,10)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks assigned to the user.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
