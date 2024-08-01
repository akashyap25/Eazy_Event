import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import checkoutOrder from '../../Utils/CheckoutOrder';

const Checkout = ({ event, userId }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async (e) => {
    e.preventDefault(); 
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    };

    await checkoutOrder(order);
  };

  return (
    <form onSubmit={onCheckout}>
      <Button type="submit" variant="contained" color="primary" size="large">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;
