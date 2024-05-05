const { createEvent, getEvent, getAllEvents, updateEvent, getEventsByOrganizerId } = require("../controllers/eventControllers");
const router = require("express").Router();

router.get("/all", getAllEvents); // Retrieve all events
router.get("/:eventId", getEvent); // Get a specific event by ID
router.get("/organizer/:organizerId", getEventsByOrganizerId); // Get events by organizer ID
router.post("/", createEvent); // Create a new event
router.put("/:eventId", updateEvent); // Update an event by ID

module.exports = router;
