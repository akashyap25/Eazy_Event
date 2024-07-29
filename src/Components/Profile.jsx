import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Grid, Pagination } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import EventCard from './Events/EventCard';

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
    // const fetchOrders = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
    //     setOrders(response.data.data);
    //     setOrderedEvents(response.data.data.map((order) => order.event));
    //     setOrdersTotalPages(response.data.totalPages);
    //   } catch (error) {
    //     console.error('Error fetching orders:', error);
    //   }
    // };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/user/${userId}`);
        setOrganizedEvents(response.data);
        setEventsTotalPages(response.data.totalPages);
        console.log()
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (userId) {
      fetchEvents();
    }
  }, [userId, ordersPage, eventsPage]);

  return (
    <>
      {/* My Tickets */}
      <Box sx={{ py: 5, px: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 3 }}>
          <Typography variant="h3" component="h3">
            My Tickets
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/#events"
            sx={{ bgcolor: '#705CF7', '&:hover': { bgcolor: '#5c49D9' }, borderRadius: '99999px' }}
          >
            Explore More Events
          </Button>
        </Box>
      </Box>

      <Box sx={{ my: 8, mx: 3 }}>
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
      <Box sx={{ py: 5, px: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 3 }}>
          <Typography variant="h3" component="h3">
            Events Organized
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/events/create"
            sx={{ bgcolor: '#705CF7', '&:hover': { bgcolor: '#5c49D9' }, borderRadius: '99999px' }}
          >
            Create New Event
          </Button>
        </Box>
      </Box>

      <Box sx={{ my: 4, mx: 6 }}>
        {organizedEvents?.length > 0 ? (
          <Grid container spacing={2}>
            {organizedEvents?.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} mt={4} key={index}>
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
