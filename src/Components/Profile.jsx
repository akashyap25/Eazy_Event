import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Grid, Pagination } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import EventCard from './Events/EventCard';
import { SERVER_URL } from '../Utils/Constants';

const ProfilePage = () => {
  const userId = useParams().id;

  const [orders, setOrders] = useState([]);
  const [orderedEvents, setOrderedEvents] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [ordersPage, setOrdersPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  const [ordersTotalPages, setOrdersTotalPages] = useState(1);
  const [eventsTotalPages, setEventsTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/orders/user/${userId}`);
        setOrders(response.data.data);
        setOrderedEvents(response.data.data.map((order) => order.event));
        setOrdersTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/events/user/${userId}`);
        setOrganizedEvents(response.data);
        setEventsTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (userId) {
      fetchOrders();
      fetchEvents();
    }
  }, [userId, ordersPage, eventsPage]);

  return (
    <>
      {/* My Tickets */}
      <Box sx={{ py: { xs: 4, sm: 5 }, px: { xs: 2, sm: 5, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
            My Tickets
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/#events"
            sx={{
              bgcolor: '#705CF7',
              '&:hover': { bgcolor: '#5c49D9' },
              borderRadius: '9999px',
              mt: { xs: 2, sm: 0 },
              width: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              height: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Explore More Events
          </Button>
        </Box>
      </Box>

      <Box sx={{ my: 8, mx: { xs: 2, sm: 5 } }}>
        {orderedEvents?.length > 0 ? (
          <Grid container spacing={2}>
            {orderedEvents?.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <EventCard event={event} isEventCreator={false} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">No event tickets purchased yet</Typography>
            <Typography>No worries - plenty of exciting events to explore!</Typography>
          </Box>
        )}
        <Pagination
          count={ordersTotalPages}
          page={ordersPage}
          onChange={(e, page) => setOrdersPage(page)}
          sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
        />
      </Box>

      {/* Events Organized */}
      <Box sx={{ py: { xs: 4, sm: 5 }, px: { xs: 2, sm: 5, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
            Events Organized
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/events/create"
            sx={{
              bgcolor: '#705CF7',
              '&:hover': { bgcolor: '#5c49D9' },
              borderRadius: '9999px',
              mt: { xs: 2, sm: 0 },
              width: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              height: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            Create New Event
          </Button>
        </Box>
      </Box>

      <Box sx={{ my: 4, mx: { xs: 2, sm: 5 } }}>
        {organizedEvents?.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {organizedEvents?.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <EventCard event={event} isEventCreator />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">No events have been created yet</Typography>
            <Typography>Go create some now</Typography>
          </Box>
        )}
        <Pagination
          count={eventsTotalPages}
          page={eventsPage}
          onChange={(e, page) => setEventsPage(page)}
          sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
        />
      </Box>
    </>
  );
};

export default ProfilePage;
