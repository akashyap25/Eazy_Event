import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jsonwebtoken/decode';

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [category, setCategory] = useState(null);
  const [userId, setUserId] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [transactionId, setTransactionId] = useState("abc123");
  const [organizer,setOrganizer] = useState(false);
  const { eventId } = useParams();
  const [cookies] = useCookies(["jwt"]);

  useEffect(() => {
    if (cookies.jwt) {
      const decoded = jwt_decode(cookies.jwt);
      setUserId(decoded.id);
    }
  }, [cookies.jwt]);
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${eventId}`);
        setEvent(response.data.event[0]);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/${event.categoryId}`);
        setCategory(response.data.category[0].name);
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    }
    if (event != null) {
      fetchCategoryDetails();
    }
  }, [event]);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/eventRegistrations/${eventId}/${userId}`);
  
        if (response.data != null) {
          setRegistrationStatus(true);
        }
      } catch (error) {
        // console.error('Error checking registration status:', error);
      }
    };

    if (userId && eventId) {
      checkRegistrationStatus();
    }
  }, [eventId, userId]);

  

  useEffect(() => {
    if (event != null && userId !== null && event.organizerId !== null && userId === event.organizerId) {
      setOrganizer(true);
    } else {
      setOrganizer(false);
    }
  }, [event, userId]);
  



  


  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/eventRegistrations', {
        eventId: eventId,
        userId: userId,
        transactionId: transactionId,
      }, {
        headers: {
          'Authorization': `Bearer ${cookies.jwt}` // Assuming jwt is the cookie containing the token
        }
      });
      if (response.data.created) {
        setRegistrationStatus(true);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };
  

  const handleEditEvent = () => {
    // Implement logic for editing the event
    console.log("Edit Event clicked");
  };

  const handleDeleteEvent = () => {
    // Implement logic for deleting the event
    console.log("Delete Event clicked");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg flex">
        {event && (
          <div className="w-1/3">
            <img src={event.imageUrl} alt={event.title} className="rounded-lg mx-auto" />
          </div>
        )}
        <div className="w-2/3 pl-8">
          {event ? (
            <div>
              <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
              <div className="mb-6">
                <p className="text-xl mb-2"><strong>Description:</strong> {event.description}</p>
                <p className="text-xl mb-2"><strong>Location:</strong> {event.location}</p>
                <p className="text-xl mb-2"><strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}</p>
                <p className="text-xl mb-2"><strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}</p>
                <p className="text-xl mb-2"><strong>Price:</strong> {event.price}</p>
                <p className="text-xl mb-2"><strong>URL:</strong> <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></p>
                <p className="text-xl mb-2"><strong>Category:</strong> {category}</p>
              </div>
              {/* Render button based on registration status and organizerId */}
              {organizer ? (
  <>
    <button onClick={handleEditEvent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
      Edit Event
    </button>
    <button onClick={handleDeleteEvent} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Delete
    </button>
  </>
) : (
  registrationStatus ? (
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Registered
    </button>
  ) : (
    <button onClick={handleRegistration} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Register
    </button>
  )
)}


            </div>
          ) : (
            <p className="text-center text-xl">Loading event details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
