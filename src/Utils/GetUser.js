import axios from 'axios';
import { SERVER_URL } from './Constants';

const getUser = async (userId) => {
  try {
    const userResponse = await axios.get(`${SERVER_URL}/api/users/clerk/${userId}`);
    const user = userResponse.data;
    return user;

  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export default getUser;
