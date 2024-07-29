import axios from 'axios';
import { SERVER_URL } from './Constants';

const getAllCategories = async () => {
    try {
        const categoriesResponse = await axios.get(`${SERVER_URL}/api/categories`);
        const categories = categoriesResponse.data;
        return categories;
    
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
    };

export default getAllCategories;
