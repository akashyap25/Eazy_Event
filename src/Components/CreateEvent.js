import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    imageURL: "",
    location: "",
    startDate: new Date(),
    startTime: "",
    endDate: new Date(),
    endTime: "",
    price: "",
    url: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full md:w-3/4 lg:w-3/4 mx-auto pt-8 pb-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-5">Create Event</h1>
      
      {/* Form Fields */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-5">
        {/* Title and Category */}
        <div className="flex flex-col md:flex-row w-full gap-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event title"
            className="input-field rounded-2xl bg-gray-200 py-2 px-4 mb-4 w-full"
          />
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="input-field rounded-2xl bg-gray-200 py-2 px-4 mb-4 w-full"
          >
            <option value="">Select Category</option>
            {/* Add your category options here */}
          </select>
        </div>
        {/* Description and Image */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event description"
            className="input-field rounded-2xl bg-gray-200 py-2 px-4 mb-4 h-40 w-full"
          ></textarea>
          <div className="flex items-center w-full">
            <input
              type="text"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="Image URL"
              className="input-field rounded-2xl bg-gray-200 py-2 px-4 h-40 w-full"
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4 8a6 6 0 1112 0 6 6 0 01-12 0zM2 8a8 8 0 1116 0 8 8 0 01-16 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>
        {/* Location */}
        <div className="flex flex-col w-full">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="input-field rounded-2xl bg-gray-200 py-2 px-4"
          />
        </div>
        {/* Start Date and End Date */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="w-full md:w-1/2">
          <p className="ml-3 whitespace-nowrap text-gray-600">Start Date:</p>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input-field rounded-2xl bg-gray-200 py-2 px-4 w-full"
            />
          </div>
          <div className="w-full md:w-1/2">
          <p className="ml-3 whitespace-nowrap text-gray-600">End Date:</p>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input-field rounded-2xl bg-gray-200 py-2 px-4 w-full"
            />
          </div>
        </div>
        {/* Price and URL */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="input-field rounded-2xl bg-gray-200 py-2 px-4 w-full"
          />
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="URL"
            className="input-field rounded-2xl bg-gray-200 py-2 px-4 w-full"
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
