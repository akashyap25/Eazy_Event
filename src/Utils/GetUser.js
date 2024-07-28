import axios from 'axios';

const getUser = async (userId) => {
  try {
    const userResponse = await axios.get(`http://localhost:5000/api/users/clerk/${userId}`);
    const user = userResponse.data;
    return user;

  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export default getUser;
