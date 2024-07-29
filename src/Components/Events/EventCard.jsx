import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import formatDateTime from '../../Utils/FormatDate';
import GetUser from '../../Utils/GetUser';
import DeleteConfirmation from '../General/DeleteConfirmation';

const EventCard = ({ event, hidePrice }) => {
  const { userId } = useAuth();
  const [user, setUser] = useState(null);

  

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

  return (
    <Card sx={{ width: 345, height: 400, boxShadow: 3, borderRadius: 4, transition: 'all 0.3s', '&:hover': { boxShadow: 6 } }}>
      <CardActionArea component={Link} to={`/events/${event?._id}`} sx={{ height: 'calc(100% - 50px)', borderRadius: 'inherit' }}>
        <Box display="flex" flexDirection="column" height="100%" sx={{ borderRadius: 'inherit' }}>
          <Box sx={{ height: '60%' }}>
            <CardMedia
              component="img"
              image={event?.imageUrl}
              alt={event?.title}
              sx={{ height: '100%', width: '100%', objectFit: 'cover', backgroundColor: '#f5f5f5', borderRadius: 'inherit' }}
            />
          </Box>
          <Box sx={{ height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent sx={{ paddingBottom: 0, flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {event?.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDateTime(event?.startDateTime)}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                by <span style={{ color: '#3f51b5' }}>{event?.organizer?.firstName} {event?.organizer?.lastName}</span>
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                {!hidePrice && (
                  <>
                    <Chip label={event?.isFree ? 'FREE' : `₹${event?.price}`} color="success" />
                    <Chip label={event?.category?.name} sx={{ backgroundColor: '#e0e0e0', color: '#757575' }} />
                  </>
                )}
              </Box>
            </CardContent>
          </Box>
        </Box>
      </CardActionArea>
      {isEventCreator && (
        <Box display="flex" justifyContent="flex-end" p={1}>
          <IconButton component={Link} to={`/events/${event?._id}/update`} color="primary">
            <EditIcon />
          </IconButton>
          <DeleteConfirmation eventId={event?._id} />
        </Box>
      )}
    </Card>
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
    organizer: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  hidePrice: PropTypes.bool,
};

export default EventCard;
