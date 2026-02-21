import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import checkoutOrder from '../../Utils/CheckoutOrder';

const Checkout = ({ event, userId }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
    }

    if (query.get('canceled')) {
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
    <div>
      {event.organizer._id === userId ? (
        <h6>
          You are the creator of this event. You don't need to buy a ticket.
        </h6>
      ) : (
        <form onSubmit={onCheckout}>
          <Button type="submit" variant="contained"  size="large">
            {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
