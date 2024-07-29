import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Avatar, Chip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import formatDateTime from '../../Utils/FormatDate';
import EventCard from './EventCard';
import { SERVER_URL } from '../../Utils/Constants';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);

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

   // Filter out the current event from related events
   const filteredRelatedEvents = relatedEvents.filter(relatedEvent => relatedEvent._id !== event._id);
   

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        bgcolor="slategrey"
        py={4}
        px={2}
      >
        <Grid container spacing={2} maxWidth="lg">
          <Grid item xs={12} md={6} display="flex" alignItems="stretch">
            <Avatar
              variant="square"
              src={event.imageUrl}
              alt="hero image"
              sx={{ width: '100%', height: 'auto', minHeight: 300, maxHeight:'80vh' ,objectFit: 'cover', objectPosition: 'center' }}
            />
          </Grid>

          <Grid item xs={12} md={6} display="flex" alignItems="stretch">
            <Paper elevation={3} sx={{ padding: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h2" gutterBottom>{event.title}</Typography>
              <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
                <Box display="flex" gap={2}>
                  <Chip
                    label={event.isFree ? 'FREE' : `₹${event.price}`}
                    sx={{ backgroundColor: 'green', color: 'white' }}
                  />
                  <Chip
                    label={event.category.name}
                    sx={{ backgroundColor: 'grey.200', color: 'black' }}
                  />
                </Box>
                <Typography variant="body2">
                  by <span style={{ color: '#3f51b5' }}>{event.organizer.firstName} {event.organizer.lastName}</span>
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarTodayIcon />
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body2">
                      {formatDateTime(event.startDateTime)}
                    </Typography>
                    <Typography variant="body2">
                      {formatDateTime(event.endDateTime)}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon />
                  <Typography variant="body2">{event.location}</Typography>
                </Box>
              </Box>

              <Box mt={4} flexGrow={1}>
                <Typography variant="h6" gutterBottom>What You'll Learn:</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: 'underline', mt: 4 }}
                  component="a"
                  href={event.url}
                  target="_blank"
                >
                  {event.url}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Related Events */}
      <Box py={8} px={2} display="flex" justifyContent="center">
        <Box maxWidth="lg" width="100%">
          <Typography variant="h4" gutterBottom>Related Events</Typography>
          <Grid container spacing={2} justifyContent="center">
            {filteredRelatedEvents.map((relatedEvent) => (
              <Grid item xs={12} sm={6} md={4} key={relatedEvent._id}>
                <EventCard event={relatedEvent} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default EventDetails;
