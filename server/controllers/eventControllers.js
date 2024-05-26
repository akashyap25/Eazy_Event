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
      categoryId,
      organizerId,
      url,
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
      url,
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

module.exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const updatedFields = {};
    if (req.body.imageURL) {
      updatedFields.imageUrl = req.body.imageURL;
    }

    const updatedEvent = await EventSQL.updateEventById(eventId, updatedFields);
    if (updatedEvent) {
      res.status(200).json({ message: 'Event updated successfully' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.getEventsByOrganizerId = async (req, res) => {
  const { organizerId } = req.params;
  try {
    const events = await EventSQL.getEventsByOrganizer(organizerId);
    if (events) {
      res.status(200).json({ events });
    } else {
      res.status(404).json({ message: 'Events not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Task Management

module.exports.createTask = async (req, res) => {
  try {
    const { eventId, userId, title, description } = req.body;

    const newTask = {
      eventId,
      userId,
      title,
      description,
    };

    const taskId = await EventSQL.createTask(newTask);
    res.status(201).json({ task: taskId, created: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating task', created: false });
  }
};

module.exports.getTasksByEventId = async (req, res) => {
  const { eventId } = req.params;
  try {
    const tasks = await EventSQL.getTasksByEventId(eventId);
    if (tasks.length > 0) {
      res.status(200).json({ tasks });
    } else {
      res.status(404).json({ message: 'No tasks found for this event' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.updateTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const updatedFields = req.body;

    const updatedTask = await EventSQL.updateTaskById(taskId, updatedFields);
    if (updatedTask) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deleted = await EventSQL.deleteTaskById(taskId);
    if (deleted) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
