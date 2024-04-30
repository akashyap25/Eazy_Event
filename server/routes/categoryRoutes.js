
const { createCategory, getCategory, getAllCategories } = require("../controllers/categoryControllers");
const router = require("express").Router();

// Category routes
router.post("/", createCategory); 
router.get("/", getAllCategories); 
router.get("/:categoryId", getCategory); 


module.exports = router;