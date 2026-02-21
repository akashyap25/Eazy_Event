import React from 'react';
import { useFormik } from 'formik';
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import locationicon from "../../assets/icons/location.svg";
import UploadFileIcon from '../../assets/icons/file-upload.svg';
import calendaricon from "../../assets/icons/calendar.svg";
import dollar from "../../assets/icons/dollar.svg";
import Button from '../UI/Button';

const EventForm = ({ initialValues,type, validationSchema, onSubmit, categories, files, setFiles, imagePreview, setImagePreview, user }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
 
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <TextField
          fullWidth
          label="Event Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        >
          {Array.isArray(categories) && categories.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="flex flex-col gap-5 md:flex-row ">
        <TextField
          fullWidth
          multiline
          rows={10}
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
        <div className="flex flex-col items-center content-center bg-slate-100  border-2 border-dashed border-gray-400 rounded-3xl w-full h-64" >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Event"
              style={{ width: "100%", height: "265px", borderRadius: "20px" }}
            />
          ) : (
            <>
              <IconButton component="label">
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    const fileList = event.target.files;
                    if (fileList) {
                      setFiles(Array.from(fileList));
                      formik.setFieldValue(
                        "imageUrl",
                        URL.createObjectURL(fileList[0])
                      );
                      setImagePreview(URL.createObjectURL(fileList[0])); 
                    }
                  }}
                />
                <div className="flex flex-col items-center content-center font-light" >
                  <img
                    src={UploadFileIcon}
                    alt="Upload icon"
                    style={{ width: 40, height: 40 }}
                  />
                  <p>Drag Photo Here..</p>
                  <p>SVG, PNG, JPG</p>
                </div>
              </IconButton>
              <button
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                className='bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-2 w-full sm:w-auto text-sm sm:text-base'
              >
                Select Image
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={locationicon}
                  alt="Location icon"
                  style={{ width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <TextField
          fullWidth
          label="Start Date & Time"
          name="startDateTime"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={calendaricon}
                  alt="Calendar icon"
                  style={{ width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
          type="datetime-local"
          value={
            formik.values.startDateTime
              ? new Date(formik.values.startDateTime)
                  .toISOString()
                  .substring(0, 16)
              : ""
          }
          onChange={(e) =>
            formik.setFieldValue("startDateTime", e.target.value)
          }
          error={
            formik.touched.startDateTime && Boolean(formik.errors.startDateTime)
          }
          helperText={
            formik.touched.startDateTime && formik.errors.startDateTime
          }
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
          inputProps={{
            style: {
              borderRadius: "20px",
            },
          }}
        />
        <TextField
          fullWidth
          label="End Date & Time"
          name="endDateTime"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={calendaricon}
                  alt="Calendar icon"
                  style={{ width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
          type="datetime-local"
          value={
            formik.values.endDateTime
              ? new Date(formik.values.endDateTime)
                  .toISOString()
                  .substring(0, 16)
              : ""
          }
          onChange={(e) => formik.setFieldValue("endDateTime", e.target.value)}
          error={
            formik.touched.endDateTime && Boolean(formik.errors.endDateTime)
          }
          helperText={formik.touched.endDateTime && formik.errors.endDateTime}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
          inputProps={{
            style: {
              borderRadius: "20px",
            },
          }}
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row"  >
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={dollar}
                  alt="Dollar icon"
                  style={{ width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isFree}
                      onChange={(e) =>
                        formik.setFieldValue("isFree", e.target.checked)
                      }
                      name="isFree"
                      color="primary"
                    />
                  }
                  label="Free Ticket"
                  sx={{ ml: 1 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
        <TextField
          fullWidth
          label="URL"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          error={formik.touched.url && Boolean(formik.errors.url)}
          helperText={formik.touched.url && formik.errors.url}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={calendaricon}
                  alt="Calendar icon"
                  style={{ width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f1f5f9",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
      </div>

      {/* Capacity & Organizer (Non-editable) */}
      <div className="flex flex-col gap-5 md:flex-row">
        <TextField
          fullWidth
          type="number"
          label="Capacity"
          name="capacity"
          value={formik.values.capacity}
          onChange={formik.handleChange}
          error={formik.touched.capacity && Boolean(formik.errors.capacity)}
          helperText={formik.touched.capacity && formik.errors.capacity}
        />
        <TextField
          fullWidth
          label={!user ? "Organizer" : ""}
          name="organizer"
          value={user?.firstName}
          disabled
        />
      </div>

      {/* Tags */}
      <TextField
        fullWidth
        label="Tags (comma separated)"
        name="tags"
        value={formik.values.tags.join(", ")}
        onChange={(e) => formik.setFieldValue("tags", e.target.value.split(",").map(tag => tag.trim()))}
        helperText="Enter multiple tags separated by commas"
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={formik.isSubmitting}
        className="mt-8"
      >
        {formik.isSubmitting
          ? type === "update"
            ? "Updating..."
            : "Submitting..."
          : type === "update"
          ? "Update Event"
          : "Submit Event"}
      </Button>
    </form>
  );
};

export default EventForm;
