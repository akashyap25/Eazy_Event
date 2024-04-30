
const router = require("express").Router();
const {createEventRegistration,getEventRegistration,getAllEventRegistrations,getEventRegistrationByOrganizerId} = require('../controllers/eventRegistrationControllers');
const { checkEventRegistration } = require("../middlewares/eventRegistrationMiddleware");

router.post('/',checkEventRegistration, createEventRegistration);

router.get('/:eventId/:userId', getEventRegistration);

router.get('/', getAllEventRegistrations);

router.get("/:organizerId", getEventRegistrationByOrganizerId);

module.exports = router;
