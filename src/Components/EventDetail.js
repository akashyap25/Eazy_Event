import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetailPage = () => {
  // State to store event details
  const [event, setEvent] = useState(null);
  
  // Extract event ID from URL params
  const { eventId } = useParams();

  useEffect(() => {
    // Function to fetch event details from backend
    const fetchEventDetails = async () => {
      try {
        // Make HTTP request to fetch event details based on event ID
        const response = await axios.get(`http://localhost:3000/events/${eventId}`);
        
        // Update component state with fetched event details
        setEvent(response.data.event);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    // Call fetchEventDetails function when component mounts
    fetchEventDetails();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup if necessary
    };
  }, [eventId]); // Run effect when eventId changes

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Event Detail</h1>
        {event ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="mb-2"><strong>Description:</strong> {event.description}</p>
            <p className="mb-2"><strong>Location:</strong> {event.location}</p>
            <p className="mb-2"><strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}</p>
            <p className="mb-2"><strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}</p>
            <p className="mb-2"><strong>Price:</strong> {event.price}</p>
            <p className="mb-2"><strong>URL:</strong> <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></p>
          </div>
        ) : (
          <p>Loading event details...</p>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
