import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import Swal from 'sweetalert2';
import EventForm from "./EventForm";
import GetUser from '../../Utils/GetUser';
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

const eventDefaultValues = {
  title: '',
  category: '',
  description: '',
  location: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  price: 0,
  url: '',
  isFree: false,
  imageUrl: '',
  organizer: '',
};

const CreateEvent = () => {
  const { userId } = useAuth();
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(!userId) return;
        const fetchedUser = await GetUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (files.length > 0) {
        values.imageUrl = await handleImageUpload(files[0]);
      }

      values.organizer = user._id;

      const response = await axios.post(`${SERVER_URL}/api/events/create`, values);

      if (response.data.success) {
        Swal.fire('Success', 'Event created successfully!', 'success');
        resetForm();
        setImagePreview(null);
      } else {
        Swal.fire('Error', 'Failed to create event', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          initialValues={eventDefaultValues}
          validationSchema={EventFormSchema}
          onSubmit={handleSubmit}
          categories={categories}
          files={files}
          setFiles={setFiles}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          type={'create'}
        />
      </div>
    </>
  );
}

export default CreateEvent;
