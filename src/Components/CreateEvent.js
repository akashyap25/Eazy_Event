import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {MdCloudUpload, MdDelete} from "react-icons/md";
import {AiFillFileImage} from "react-icons/ai";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from "axios";


const CreateEvent = () => {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    imageURL: "",
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    price: "",
    url: "",
    userId: userId,
  });

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No image selected');

  const [categories, setCategories] = useState([]); //link these to the backend to fetch categories
  
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];
  const handleChange = (e) => {
    const { name, value,} = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };
  

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.post("http://localhost:3000/events", formData);
      console.log(response.data); // Log response from backend
      // Reset form fields after successful submission if needed
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full md:w-3/4 lg:w-3/4 mx-auto pt-8 pb-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-5">Create Event</h1>
      
      {/* Form Fields */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-5">
        {/* Title and Category */}
        <div className="flex flex-col md:flex-row w-full gap-5 mb-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event title"
            className="rounded-2xl bg-gray-100 py-2 px-4 mb-4 w-full"
          />
          <div className="flex flex-col md:flex-row w-full gap-5 mb-5">
              <Dropdown options={options}  value={defaultOption} placeholder="Select an option" className="rounded-2xl bg-gray-100 py-2 px-4 mb-4 w-full"/>
          </div>
          
          
        </div>
        {/* Description and Image */}
        <div className="flex flex-col md:flex-row gap-5 w-full mb-5">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event description"
            className=" rounded-2xl bg-gray-100 py-2 px-4 mb-4 h-72 w-full"
          ></textarea>
  <div className="flex flex-col  gap-5 w-full">
  <div className="flex flex-col w-full items-center justify-center h-72 border-2 border-dashed bg-gray-100 rounded-2xl cursor-pointer relative">
  <input
  type="file"
  name="imageURL"
  accept="*"
  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        imageURL: file.name, // Use e.target.name to access the input name
      });
    }
  }}
/>
    {image ? (
      <img src={image} className="w-full h-full object-contain" alt="filename" />
    ) : (
      <>
      <MdCloudUpload color="#1475cf" size={60} />
      <p className="text-gray-500">Browse Images to upload</p>
      </>
    )}
   
  </div>
   <section className="flex flex-row">
      <AiFillFileImage color="#1475cf" size={30} />
      <span className="text-gray-500 flex flex-row">{fileName}
      <MdDelete className="ml-4 mt-1 cursor-pointer"
        onClick={() => {
          setImage(null);
          setFileName('No image selected');
        }}
      />
      </span>
    </section>
</div>

        </div>
        {/* Location */}
        <div className="flex flex-col w-full mb-5">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="input-field rounded-2xl bg-gray-100 py-2 px-4"
          />
        </div>
        {/* Start Date and End Date */}
        <div className="flex flex-col md:flex-row gap-5 w-full mb-5">
          <div className="w-full md:w-1/2">
          <p className="ml-3 whitespace-nowrap text-gray-600">Start Date:</p>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              value={formData.startDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input-field rounded-2xl bg-gray-100 py-2 px-4 w-full"
            />
          </div>
          <div className="w-full md:w-1/2">
          <p className="ml-3 whitespace-nowrap text-gray-600">End Date:</p>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              value={formData.endDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input-field rounded-2xl bg-gray-100 py-2 px-4 w-full"
            />
          </div>
        </div>
        {/* Price and URL */}
        <div className="flex flex-col md:flex-row gap-5 w-full mb-5">
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="input-field rounded-2xl bg-gray-100 py-2 px-4 w-full"
          />
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="URL"
            className="input-field rounded-2xl bg-gray-100 py-2 px-4 w-full"
          />
        </div>
      </div>

      {/* Button */}
      <div className="text-center">
        <button
          type="submit"
          className="button mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-2xl w-full"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default CreateEvent;
