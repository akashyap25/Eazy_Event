import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import formatDateTime from '../../Utils/FormatDate';
import GetUser from '../../Utils/GetUser';
import DeleteConfirmation from '../General/DeleteConfirmation';
import EditIcon from '../../assets/icons/edit.svg';

const EventCard = ({ event, hidePrice }) => {
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const hasOrderLink = event?.organizer?._id === userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const fetchedUser = await GetUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const eventOrganizerId = event?.organizer?._id?.toString();
  const isEventCreator = user?._id === eventOrganizerId;

 
  const { dateOnly: startDateOnly, timeOnly: startTimeOnly } = formatDateTime(event?.startDateTime);
  const { dateOnly: endDateOnly, timeOnly: endTimeOnly } = formatDateTime(event?.endDateTime);

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        to={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link to={`/events/${event._id}/update`}>
            <img src={EditIcon} alt="edit" width={24} height={24} className='ml-2' />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? 'FREE' : `₹${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-gray-200 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {startDateOnly === endDateOnly
            ? `${startDateOnly} ${startTimeOnly} - ${endTimeOnly}`
            : `${startDateOnly} - ${endDateOnly}`}
        </p>

        <Link to={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            By {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {/* {hasOrderLink && (
            <Link to={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <img src={Arrow} alt="search" width={10} height={10} />
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isFree: PropTypes.bool.isRequired,
    price: PropTypes.number,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    startDateTime: PropTypes.string.isRequired,
    endDateTime: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  hidePrice: PropTypes.bool,
};

export default EventCard;
