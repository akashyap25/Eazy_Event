import { useState, useEffect } from 'react';
import axios from 'axios';
import heroImg from "../assets/images/hero.png";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import EventCard from './Events/EventCard';

export default function Home() {

  const [events, setEvents] = useState([]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await axios.get(`http://localhost:5000/api/events`);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }
  , []);



  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <a href='#events'>
            <ColorButton
              variant="contained"
              size="large"
              sx={{borderRadius: '9999px'}}
              className="w-full sm:w-fit bg-orange-400 hover:bg-orange-500 text-white"
              
            >
              Explore Now
            </ColorButton>
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
        <div className='flex flex-row flex-wrap gap-12 justify-center items-center'>
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
        </div>

      </section>
    </>
  );
}
