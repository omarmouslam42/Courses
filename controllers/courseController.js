const asyncHandler = require("express-async-handler");
const Course = require("../models/Course");

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ success: true, data: courses });
});

// Get course by ID
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  res.json({ success: true, data: course });
});

// Create a course
const createCourse = asyncHandler(async (req, res, next) => {
  const { title, description, startDate, endDate, price } = req.body;
  console.log(title, description, startDate, endDate, price);

  // Convert file buffer to base64 if available
  const image = req.file ? req.file.buffer.toString("base64") : null;
  console.log(image);

  console.log(
    "Image (base64):",
    image ? image.slice(0, 100) + "..." : "No image uploaded"
  );

  // Optional: Validate required fields
  if (!title || !description || price == null) {
    return res.status(400).json({
      success: false,
      message: "Title, description, and price are required",
    });
  }

  const newCourse = new Course({
    title,
    description,
    startDate,
    endDate,
    price,
    image,
  });

  const saved = await newCourse.save();
  res.status(201).json({ success: true, data: saved });
});

// Update a course
const updateCourse = asyncHandler(async (req, res) => {
  const { image } = req.file ? req.file.buffer.toString("base64") : null;
  if (image) {
    req.body.image = image;
  }

  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course)
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  res.json({ success: true, data: course });
});

// Delete a course
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course)
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  res.json({ success: true, message: "Course deleted successfully" });
});
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
