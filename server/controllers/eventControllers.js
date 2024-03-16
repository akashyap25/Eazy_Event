const Event = require("../models/eventModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Anurags_Secret", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = {
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    price: "",
    category: "",
    organizer: "",
  };

  if (err.message.includes("Event validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.createEvent = async (req, res, next) => {
    try {
      const {
        title,
        description,
        location,
        imageUrl,
        startDate,
        endDate,
        price,
        category,
        organizer,
      } = req.body;
      const event = await Event.create({
        title,
        description,
        location,
        imageUrl,
        startDate,
        endDate,
        price,
        category,
        organizer,
      });
    //   res.status(201).json({ event: event._id, created: true });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
    //   res.status(400).json({ errors, created: false });  Use an appropriate status code
    }
  };
  
  

module.exports.getEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
