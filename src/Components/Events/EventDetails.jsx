import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import formatDateTime from '../../Utils/FormatDate';
import EventCard from './EventCard';
import { SERVER_URL } from '../../Utils/Constants';
import CheckoutButton from '../General/CheckoutButton';
import { useAuth } from "@clerk/clerk-react";
import getUser from '../../Utils/GetUser';
import CalendarIcon from '../../assets/icons/calendar.svg';
import LocationIcon from '../../assets/icons/location.svg';


const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const { userId } = useAuth(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const fetchedUser = await getUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await axios.get(`${SERVER_URL}/api/events/${id}`);
        setEvent(eventResponse.data);
        const relatedEventsResponse = await axios.get(`${SERVER_URL}/api/events/related`, {
          params: {
            categoryId: eventResponse.data.category._id,
            eventId: eventResponse.data._id,
          },
        });
        setRelatedEvents(relatedEventsResponse.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <h6>Loading...</h6>;
  }

  const eventOrganizerId = event?.organizer?._id?.toString();
  const isEventCreator = user?._id === eventOrganizerId;

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <img
          src={event.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
         

         <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
               <h2 className='h2-bold'>{event.title}</h2>
                {/* {isEventCreator && (
                  <div className='flex gap-1'>
                    <IconButton component={Link} to={`/events/${event._id}/update`} color="primary">
                      <img src={EditIcon} alt="Edit" style={{ width: 24, height: 24 }} />
                    </IconButton>
                    <DeleteConfirmation eventId={event._id} />
                  </div>
                )} */}
              
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {event.isFree ? 'FREE' : `₹${event.price}`}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {event.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span>
              </p>
            </div>
            </div>

              <CheckoutButton event={event} />

              <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <img src={CalendarIcon} alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} - {' '}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(event.endDateTime).dateOnly} -  {' '}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <img src={LocationIcon} alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</p>
          </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold ml-10">Related Events</h2>
      <div className='flex flex-row flex-wrap gap-8 justify-center items-center'>
        
          {relatedEvents.length == 0 && (
            <h3 className="h3-bold p-72">No Related Events</h3> 
          )}
          {relatedEvents.filter(relatedEvents => relatedEvents._id !== event._id).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        </section>
    </>
  );
};

export default EventDetails;
