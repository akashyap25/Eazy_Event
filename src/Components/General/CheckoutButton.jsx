import {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import getUser from '../../Utils/GetUser';
import CheckoutModal from './CheckoutModal';
import TicketModal from './TicketModal';
import apiService from '../../utils/apiService';
import { generateTicketPDF } from '../../utils/generatePDF';
import { Ticket, Download, Eye } from 'lucide-react';

const CheckoutButton = ({ event }) => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!currentUser?._id) return;
        const fetchedUser = await getUser(currentUser._id);
        setUser(fetchedUser);
        
        // Check if user is already registered for this event
        checkRegistrationStatus();
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [currentUser?._id, event._id]);

  useEffect(() => {
    console.log('showTicket state changed:', showTicket);
  }, [showTicket]);

  const checkRegistrationStatus = async () => {
    try {
      if (!currentUser?._id) return;
      setLoading(true);
      
      // Check if user has orders for this event
      const response = await apiService.get(`/api/orders/user/${currentUser._id}`);
      const userOrders = response.data || [];
      
      console.log('Checking registration for event:', event._id);
      console.log('User orders:', userOrders);
      
      const eventOrder = userOrders.find(order => 
        order.event === event._id || 
        (order.event && order.event._id === event._id) ||
        (order.event && order.event._id === event._id)
      );
      if (eventOrder) {
        console.log('Found registration:', eventOrder);
        setIsRegistered(true);
        setTicketData(eventOrder);
      } else {
        console.log('No registration found');
        setIsRegistered(false);
        setTicketData(null);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
      setIsRegistered(false);
      setTicketData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    const currentPath = window.location.pathname;
    navigate(`/sign-in?redirect=${encodeURIComponent(currentPath)}`); 
  };

  const handleCheckoutSuccess = (ticket) => {
    console.log('Checkout success, ticket data:', ticket);
    setTicketData(ticket);
    setIsRegistered(true);
    setShowCheckout(false);
    // Force a re-render by updating state
    setUser({...user, hasRegistered: true});
    
    // Force refresh the registration status
    setTimeout(() => {
      checkRegistrationStatus();
    }, 1000);
  };

  const handleViewTicketFromModal = (ticket) => {
    console.log('View ticket from modal, ticket:', ticket);
    setTicketData(ticket);
    setShowTicket(true);
  };

  const handleDownloadTicket = async () => {
    if (!ticketData || downloading) return;
    
    setDownloading(true);
    try {
      await generateTicketPDF(ticketData, event);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleViewTicket = () => {
    console.log('View ticket clicked, ticketData:', ticketData);
    console.log('Current showTicket state:', showTicket);
    if (!ticketData) {
      console.log('No ticket data available');
      return;
    }
    console.log('Setting showTicket to true');
    setShowTicket(true);
    
    // Test if the modal should be visible
    setTimeout(() => {
      console.log('After timeout, showTicket state:', showTicket);
    }, 100);
    
    // Simple test - show alert first
    alert('View ticket clicked! Check console for modal state.');
  };

  if (hasEventFinished) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">Sorry, tickets are no longer available.</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button 
        variant="contained" 
        onClick={handleSignIn}
        size="large"
        className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        Get Tickets
      </Button>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
        <span className="text-gray-600">Checking registration...</span>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outlined"
          onClick={handleViewTicket}
          startIcon={<Eye />}
          size="large"
          className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          View Ticket
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadTicket}
          startIcon={downloading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Download />}
          size="large"
          disabled={downloading}
          className={`${downloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'} transition-all duration-200 transform hover:scale-105`}
        >
          {downloading ? 'Generating PDF...' : 'Download'}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button 
        variant="contained" 
        onClick={() => setShowCheckout(true)}
        size="large"
        className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        startIcon={<Ticket />}
      >
        Get Tickets
      </Button>
      
      <CheckoutModal
        event={event}
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={handleCheckoutSuccess}
        onViewTicket={handleViewTicketFromModal}
      />
      
      <TicketModal
        ticket={ticketData}
        event={event}
        isOpen={showTicket}
        onClose={() => {
          console.log('Closing ticket modal');
          setShowTicket(false);
        }}
      />
    </>
  );
};

export default CheckoutButton;
