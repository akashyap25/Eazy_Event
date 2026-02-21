import axios from 'axios';
import { SERVER_URL } from '../Utils/Constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add any auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/sign-in';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access denied:', error.response.data.message);
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('Server error:', error.response.data.message);
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const eventAPI = {
  // Get all events
  getAll: (params = {}) => api.get('/api/events', { params }),
  
  // Get event by ID
  getById: (id) => api.get(`/api/events/${id}`),
  
  // Create event
  create: (data) => api.post('/api/events/create', data),
  
  // Update event
  update: (id, data) => api.put(`/api/events/${id}`, data),
  
  // Delete event
  delete: (id) => api.delete(`/api/events/${id}`),
  
  // Get events by user
  getByUser: (userId) => api.get(`/api/events/user/${userId}`),
  
  // Get related events
  getRelated: (categoryId) => api.get('/api/events/related', { params: { categoryId } }),
  
  // Register for event
  register: (eventId) => api.post(`/api/events/${eventId}/register`),
  
  // Unregister from event
  unregister: (eventId) => api.delete(`/api/events/${eventId}/unregister`),
};

export const userAPI = {
  // Get user by ID
  getById: (id) => api.get(`/api/users/${id}`),
  
  // Get user by Clerk ID
  getByClerkId: (clerkId) => api.get(`/api/users/clerk/${clerkId}`),
  
  // Create user
  create: (data) => api.post('/api/users', data),
  
  // Update user
  update: (clerkId, data) => api.put(`/api/users/${clerkId}`, data),
  
  // Delete user
  delete: (clerkId) => api.delete(`/api/users/${clerkId}`),
};

export const categoryAPI = {
  // Get all categories
  getAll: () => api.get('/api/categories'),
  
  // Create category
  create: (data) => api.post('/api/categories', data),
};

export const orderAPI = {
  // Create checkout session
  checkout: (data) => api.post('/api/orders/checkout', data),
  
  // Create order
  create: (data) => api.post('/api/orders', data),
  
  // Get orders by event
  getByEvent: (eventId) => api.get(`/api/orders/event/${eventId}`),
  
  // Get orders by user
  getByUser: (userId) => api.get(`/api/orders/user/${userId}`),
  
  // Get registered users for event
  getRegisteredUsers: (eventId) => api.get(`/api/orders/registered/${eventId}`),
};

export const taskAPI = {
  // Create task
  create: (data) => api.post('/api/tasks', data),
  
  // Get tasks by user
  getByUser: (userId) => api.get(`/api/tasks/user/${userId}`),
  
  // Get tasks by event
  getByEvent: (eventId) => api.get(`/api/tasks/event/${eventId}`),
  
  // Update task
  update: (taskId, data) => api.put(`/api/tasks/${taskId}`, data),
  
  // Delete task
  delete: (taskId) => api.delete(`/api/tasks/${taskId}`),
  
  // Add comment
  addComment: (taskId, data) => api.post(`/api/tasks/${taskId}/comment`, data),
  
  // Add reply
  addReply: (taskId, commentId, data) => api.post(`/api/tasks/${taskId}/comment/${commentId}/reply`, data),
};

export default api;