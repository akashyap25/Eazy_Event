import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { SERVER_URL } from './Constants';

const stripePromise = loadStripe('pk_test_51OtkUuSETNjFDxEePZVQJWorpLeRpus9qPt5A0CBC9alqlQYtEBh4sKOMlyNFaoiLhUCUGvo4yVGoANljPCv0fGu00QpCN4Isl');

const CheckoutOrder = async (order) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/orders/checkout`, order);
    const stripe = await stripePromise;
    const { url } = response.data;

    
    window.location.href = url;
  } catch (error) {
    console.error('Error creating order:', error.response?.data?.message || error.message);
  }
}

export default CheckoutOrder;
