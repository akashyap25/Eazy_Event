import axios from 'axios';

const deleteEvent = async ({ eventId }) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        if (response.status === 200) {
        return response.data;
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
    }


    export default deleteEvent;