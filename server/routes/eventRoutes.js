const { createEvent, getEvent, getAllEvents,updateEvent } = require("../controllers/eventControllers");
// const { checkUser } = require("../middlewares/authMiddlewares");
const router = require("express").Router();

router.post("/",createEvent); 
router.get("/", getAllEvents); 
router.get("/:eventId", getEvent); 
router.put("/:eventId", updateEvent);

module.exports = router;
