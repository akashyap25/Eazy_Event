import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Form Fields */}
      <div className="flex flex-col gap-5 md:flex-row">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event title"
          className="input-field"
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Category</option>
          {/* Add your category options here */}
        </select>
      </div>

      {/* Additional Fields (if any) */}

      {/* Buttons */}
      <button
        type="submit"
        className="button col-span-2 w-full"
      >
        Submit Event
      </button>
    </form>
  );
};

export default CreateEvent;
