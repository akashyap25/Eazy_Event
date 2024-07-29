import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Chip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import formatDateTime from '../../Utils/FormatDate';
import GetUser from '../../Utils/GetUser';
import DeleteConfirmation from '../General/DeleteConfirmation';
import EditIcon from '../../assets/icons/edit.svg';

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
    <Card
      sx={{
        width: { xs: '100%', sm: 345 },
        height: 400,
        boxShadow: 3,
        borderRadius: 4,
        transition: 'all 0.3s',
        '&:hover': { boxShadow: 6 },
        paddingBottom:5,
      }}
    >
      <Box sx={{ position: 'relative', height: '100%', borderRadius: 'inherit' }}>
        {isEventCreator && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: 'white',
              borderRadius: '15px',
            }}
          >
            <IconButton component={Link} to={`/events/${event?._id}/update`} color="primary">
              <img src={EditIcon} alt="Edit" style={{ width: 24, height: 24 }} />
            </IconButton>
            <DeleteConfirmation eventId={event?._id} />
          </Box>
        )}
        <CardActionArea component={Link} to={`/events/${event?._id}`} sx={{ height: '100%', borderRadius: 'inherit' }}>
          <Box display="flex" flexDirection="column" height="100%" sx={{ borderRadius: 'inherit' }}>
            <Box sx={{ height: '60%', position: 'relative' }}>
              <CardMedia
                component="img"
                image={event?.imageUrl}
                alt={event?.title}
                sx={{ height: '100%', width: '100%', objectFit: 'cover', backgroundColor: '#f5f5f5', borderRadius: 'inherit' }}
              />
            </Box>
            <Box sx={{ height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent sx={{ paddingBottom: 0, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, // Adjust font size for different screen sizes
                    overflow: 'hidden', // Ensure text doesn't overflow
                    textOverflow: 'ellipsis', // Add ellipsis if text is too long
                    whiteSpace: 'nowrap' // Prevent text from wrapping to the next line
                  }}
                >
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
      </Box>
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
