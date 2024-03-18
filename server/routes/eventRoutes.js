const { createEvent, getEvent, getAllEvents } = require("../controllers/eventControllers");
const { checkUser } = require("../middlewares/authMiddlewares");
const router = require("express").Router();

router.post("/", checkUser, createEvent); // Requires authentication
router.get("/", getAllEvents); // No authentication required
router.get("/:eventId", getEvent); // No authentication required

module.exports = router;
