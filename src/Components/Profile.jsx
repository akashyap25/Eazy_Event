import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import EventCard from './Events/EventCard';
import { SERVER_URL } from '../Utils/Constants';

const ProfilePage = () => {
  const userId = useParams().id;

  const [orders, setOrders] = useState([]);
  const [orderedEvents, setOrderedEvents] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/orders/user/${userId}`);
        setOrders(response.data.data);
        setOrderedEvents(response.data.data.map((order) => order.event));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/events/user/${userId}`);
        setOrganizedEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (userId) {
      fetchOrders();
      fetchEvents();
    }
  }, [userId]);

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
        <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
        <button  size="lg" className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-2 w-full sm:w-auto text-sm sm:text-base">
            <Link to="/#events">
              Explore More Events
            </Link>
          </button>
        </div>
      </section>

      <section className="wrapper my-8">
        {orderedEvents?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {orderedEvents.map((event, index) => (
              <EventCard key={index} event={event} isEventCreator={false} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h6 className="text-lg font-semibold">No event tickets purchased yet</h6>
            <p>No worries - plenty of exciting events to explore!</p>
          </div>
        )}
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <button  size="lg" className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-2 w-full sm:w-auto text-sm sm:text-base">
            <Link to="/events/create">
              Create New Event
            </Link>
          </button>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        {organizedEvents?.length > 0 ? (
         <div className='flex flex-row flex-wrap gap-12 justify-center items-center'>
            {organizedEvents.map((event, index) => (
              <EventCard key={index} event={event} isEventCreator />
            ))}
          </div>
        ) : (
          <div className="text-center">
          <h6 className="text-lg font-semibold">No event tickets purchased yet</h6>
          <p>No worries - plenty of exciting events to explore!</p>
        </div>
        )}
       
      </section>
    </>
  );
};

export default ProfilePage;



