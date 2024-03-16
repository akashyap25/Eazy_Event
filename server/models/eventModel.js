const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
  startDate: {
    type: Date,
    required: [true, "Start Date/Time is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date/Time is required"],
  },
  price: String,
  isFree: {
    type: Boolean,
    default: false,
  },
  url: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Event", eventSchema);
