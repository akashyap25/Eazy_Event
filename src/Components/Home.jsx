import { useState, useEffect } from 'react';
import axios from 'axios';
import heroImg from "../assets/images/hero.png";
import EventCard from './Events/EventCard';
import { SERVER_URL } from '../Utils/Constants';
import Search from './General/Search';
import CategoryFilter from './General/CategoryFilter';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const location = useLocation();
  


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await axios.get(`${SERVER_URL}/api/events`);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    const category = params.get('category') || '';

    const applyFilters = () => {
      let filtered = events;

      if (query) {
        filtered = filtered.filter(event => 
          event.title.toLowerCase().includes(query.toLowerCase()),
          
        );
      }

      if (category && category !== 'All') {
        filtered = filtered.filter(event => 
          event.category.name === category
        );
      }

      setFilteredEvents(filtered);
    };

    applyFilters();
  }, [events, location.search]);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <a href='#events'>
              <button  size="lg" className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-2 w-full sm:w-auto text-sm sm:text-base"
              >
                Explore Now
              </button>
            </a>
          </div>

          <img
            src={heroImg}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trust by <br /> Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        
        <div className='flex flex-row flex-wrap gap-8 justify-center items-center'>
          {filteredEvents.length === 0 && (
            <h3 className="h3-bold p-72">No events found</h3>
          )}
          {filteredEvents?.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}
