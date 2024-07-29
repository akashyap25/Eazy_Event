import React from 'react';
import { useFormik } from 'formik';
import {
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import locationicon from "../../assets/icons/location.svg";
import UploadFileIcon from '../../assets/icons/file-upload.svg';
import calendaricon from "../../assets/icons/calendar.svg";
import dollar from "../../assets/icons/dollar.svg";

const ColorButton = styled(Button)(() => ({
  backgroundColor: '#705CF7',
  '&:hover': {
    backgroundColor: '#5c49D9',
  },
}));

const EventForm = ({ initialValues,type, validationSchema, onSubmit, categories, files, setFiles, imagePreview, setImagePreview }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={5}>
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
            backgroundColor: "#f0f0f0",
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
            backgroundColor: "#f0f0f0",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        >
          {categories?.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={5}>
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
            backgroundColor: "#f0f0f0",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          border="1px dashed grey"
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f0f0f0",
            width: "100%",
            height: '265px',
          }}
        >
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
                      setImagePreview(URL.createObjectURL(fileList[0])); // Set image preview
                    }
                  }}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  fontSize=".6em"
                >
                  <img
                    src={UploadFileIcon}
                    alt="Upload icon"
                    style={{ width: 40, height: 40 }}
                  />
                  <p>Drag Photo Here..</p>
                  <p>SVG, PNG, JPG</p>
                </Box>
              </IconButton>
              <ColorButton
                variant="contained"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                sx={{ borderRadius: "20px", mt: 2 }}
              >
                Select Image
              </ColorButton>
            </>
          )}
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={5}>
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
            backgroundColor: "#f0f0f0",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={5}>
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
            backgroundColor: "#f0f0f0",
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
            backgroundColor: "#f0f0f0",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
          inputProps={{
            style: {
              borderRadius: "20px",
            },
          }}
        />
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={5}>
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
            backgroundColor: "#f0f0f0",
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
            backgroundColor: "#f0f0f0",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        />
      </Box>

      <ColorButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "20px",
          "& .MuiInputBase-root": { borderRadius: "20px" },
        }}
      >
        {formik.isSubmitting
          ? type === "update"
            ? "Updating..."
            : "Submitting..."
          : type === "update"
          ? "Update Event"
          : "Submit Event"}
      </ColorButton>
    </form>
  );
};

export default EventForm;
