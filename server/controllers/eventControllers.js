const EventSQL = require('../models/eventModel');

const handleErrors = (err) => {
  let errors = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
    price: '',
    category: '',
    organizer: '',
  };

  if (err.message.includes('Event validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      imageUrl,
      startDate,
      endDate,
      price,
      categoryId, // Assuming categoryId is provided in req.body
      organizerId, // Assuming organizerId is provided in req.body
    } = req.body;
    
    const newEvent = {
      title,
      description,
      location,
      imageUrl,
      startDate,
      endDate,
      price,
      categoryId,
      organizerId,
    };

    const eventId = await EventSQL.createEvent(newEvent);
    res.status(201).json({ event: eventId, created: true });
  } catch (err) {
    console.error(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors, created: false });
  }
};

module.exports.getEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await EventSQL.getEventById(eventId);
    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.getAllEvents = async (req, res) => {
  try {
    const events = await EventSQL.getAllEvents();
    res.status(200).json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
