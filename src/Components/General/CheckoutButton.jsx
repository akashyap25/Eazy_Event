import {useState,useEffect} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Checkout from './Checkout'
import { useAuth } from '@clerk/clerk-react';
import getUser from '../../Utils/GetUser';

const CheckoutButton = ({ event }) => {
  const {userId} = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const fetchedUser = await getUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);


  const handleSignIn = () => {
    navigate('/sign-in'); 
  };

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
      ) : (
        <>
          {!user ? (
            <Button 
              variant="contained" 
              onClick={handleSignIn}
              size="large"
            >
              Get Tickets
            </Button>
          ) : (
            <Checkout event={event} userId={user?._id} />
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
