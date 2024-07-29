import axios from 'axios';
import { SERVER_URL } from './Constants';

const deleteEvent = async ({ eventId }) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/api/events/${eventId}`);
        if (response.status === 200) {
        return response.data;
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
    }


    export default deleteEvent;