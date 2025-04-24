const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController.js");

const router = express.Router();
const multer = require('multer');
const upload = multer();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/",upload.single("image"), createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
