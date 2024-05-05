const { createEvent, getEvent, getAllEvents, updateEvent,getEventsByOrganizerId } = require("../controllers/eventControllers");
// const { checkUser } = require("../middlewares/authMiddlewares");
const router = require("express").Router();

router.get("/", getAllEvents); 
router.post("/", createEvent); 
router.get("/:eventId", getEvent); 
router.put("/:eventId", updateEvent);
router.get("/organizer/:organizerId", getEventsByOrganizerId);

module.exports = router;
