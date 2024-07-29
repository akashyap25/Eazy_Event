import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import EventForm from './EventForm';
import { useAuth } from '@clerk/clerk-react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { SERVER_URL } from '../../Utils/Constants';

const EventFormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  startDateTime: Yup.date().required('Start date and time is required'),
  endDateTime: Yup.date().required('End date and time is required'),
  price: Yup.number().required('Price is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
  isFree: Yup.boolean(),
});

const UpdateEvent = () => {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [initialValues, setInitialValues] = useState(null);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "djyk2qku");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmfgwodtn/image/upload",
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
        const response = await axios.get(`${SERVER_URL}/api/events/${id}`);
        const event = response.data;

        // Transform the category to its _id
        if (event.category && typeof event.category === 'object') {
          event.category = event.category._id;
        }

        setInitialValues(event);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  // Submit event values
  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`${SERVER_URL}/api/events/${id}`, values);
      if (response.status === 200) {
        Swal.fire('Success', 'Event updated successfully', 'success');
        navigate(`/events/${id}`); // Navigate to the event details page
      } else {
        Swal.fire('Error', 'Event update failed', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  if (!initialValues) return <div>Loading...</div>;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          initialValues={initialValues}
          validationSchema={EventFormSchema}
          onSubmit={handleSubmit}
          categories={categories}
          files={files}
          setFiles={setFiles}
          imagePreview={initialValues.imageUrl}
          setImagePreview={setImagePreview}
          type="update"
        />
      </div>
    </>
  );
};

export default UpdateEvent;
