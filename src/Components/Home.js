  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import heroImg from "../assets/images/hero.png";

  export default function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get("http://localhost:3000/events");
          console.log("Events:", response.data);

          setEvents(response.data.events);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      fetchEvents();
    }, []);
  

  

    return (
      <>
        <section className="bg-cover bg-center p-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8">
            <div className="md:w-1/2 mb-8 md:mb-0 md:order-2">
              <img
                src={heroImg}
                alt="hero"
                className="max-h-60 md:max-h-96 mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:order-1">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
              <p className="text-base md:text-lg mb-4">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
              <button className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-lg text-lg md:text-xl">
                <a href="#events">Explore Now</a>
              </button>
            </div>
          </div>
        </section>

        <section id="events" className="container mx-auto my-8 p-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Trusted by <br/> Thousands of Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events?.map(event => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                  <img
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-80 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-sm md:text-base mb-2">{event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}</p>
                  <p className="text-gray-500 mb-2">{event.location}</p>
                  <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg text-lg">
                    <Link to={`/event/${event.id}`}>View Details</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }
