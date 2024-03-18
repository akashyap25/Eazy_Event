import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import heroImg from "../assets/images/hero.png";
import { set } from 'mongoose';

export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]); // Removed setCookie since it's not used
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
        setIsUserLoggedIn(false);
      } else {
        try {
          const { data } = await axios.post(
            "http://localhost:3000",
            {},
            {
              withCredentials: true,
            }
          );
          if (data.status) {
            setIsUserLoggedIn(true);
          } else {
            removeCookie('jwt');
            setIsUserLoggedIn(false);
          }
        } catch (error) {
          removeCookie('jwt');
          setIsUserLoggedIn(false);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
  
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events");
      setEvents(response.data.events);

    } catch (error) {
      console.error("Error fetching events:", error);
    
    }
  };
  fetchEvents();
}, []);



  return (
    <>
      <section className=" bg-cover bg-center p-10">
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

      <section id="events" className="container mx-auto my-8 p-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Trusted by <br/> Thousands of Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
              <p className="text-lg mb-4">{event.description}</p>
              <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg text-lg">
                <Link to={`/event/${event._id}`}>View Details</Link>
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
