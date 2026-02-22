import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../utils/apiService';
import EventForm from './EventForm';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { SERVER_URL } from '../../Utils/Constants';
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Tag, 
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle,
  ArrowLeft,
  Upload,
  X as CloseIcon,
  Plus,
  AlertCircle,
  Info,
  Clock,
  Globe,
  User,
  Settings,
  Eye,
  Save,
  Edit
} from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';

const EventFormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  startDateTime: Yup.date().required('Start date and time is required'),
  endDateTime: Yup.date().required('End date and time is required'),
  price: Yup.number().required('Price is required'),
  url: Yup.string().url('Invalid URL').nullable(),
  isFree: Yup.boolean(),
});

const UpdateEvent = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.get(`/api/categories`);
        // apiService returns the response body directly: { success, categories }
        const categoriesData = response?.categories ?? [];
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Error uploading image to Cloudinary");
    }
  };

  // Fetch event values
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.get(`/api/events/${id}`);
        // apiService returns response body: { success, data: event }
        const event = response?.data ?? response;

        // Transform the category to its _id
        if (event.category && typeof event.category === 'object') {
          event.category = event.category._id;
        }

        // Ensure all required fields are present with proper defaults
        const formattedEvent = {
          title: event.title || '',
          description: event.description || '',
          location: event.location || '',
          startDateTime: event.startDateTime ? new Date(event.startDateTime).toISOString().slice(0, 16) : '',
          endDateTime: event.endDateTime ? new Date(event.endDateTime).toISOString().slice(0, 16) : '',
          price: event.price || '0',
          isFree: event.isFree || false,
          url: event.url || '',
          category: event.category || '',
          capacity: event.capacity || 50,
          tags: Array.isArray(event.tags) ? event.tags : [],
          imageUrl: event.imageUrl || ''
        };

        setInitialValues(formattedEvent);
        setImagePreview(event.imageUrl || null);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  // Submit event values
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await apiService.put(`/api/events/${id}`, values);
      if (response?.success !== false) {
        Swal.fire({
          title: 'Success!',
          text: 'Event updated successfully',
          icon: 'success',
          confirmButtonText: 'View Event'
        }).then(() => {
          navigate(`/events/${id}`);
        });
      } else {
        Swal.fire('Error', response?.message || 'Event update failed', 'error');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      Swal.fire('Error', error?.message || error?.response?.data?.message || 'Failed to update event', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Loading event details..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Event</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button onClick={() => navigate('/events')}>
              Back to Events
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // No data state
  if (!initialValues || !Array.isArray(categories)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Preparing form..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              icon={ArrowLeft}
              className="flex items-center gap-2"
            >
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <Edit className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Update Event</h1>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Details</h2>
                <p className="text-gray-600">Update your event information below</p>
              </div>
              
              <EventForm
                initialValues={initialValues}
                validationSchema={EventFormSchema}
                onSubmit={handleSubmit}
                categories={categories}
                files={files}
                setFiles={setFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                type="update"
                user={user}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Preview</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Title</label>
                  <p className="text-gray-900 font-medium">{initialValues?.title || 'Event Title'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <p className="text-gray-900">
                    {initialValues?.startDateTime 
                      ? new Date(initialValues.startDateTime).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Select date'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-gray-900">{initialValues?.location || 'Event Location'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <p className="text-gray-900">
                    {initialValues?.isFree ? 'Free' : `$${initialValues?.price || '0'}`}
                  </p>
                </div>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Event Title</p>
                    <p className="text-sm text-gray-600">Make it catchy and descriptive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date & Time</p>
                    <p className="text-sm text-gray-600">Choose a date and time that works for your audience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">Provide a clear venue or online meeting link</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
