const Bootcamp = require("../models/Bootcamp");
const Course = require("../models/Course");
const User = require("../models/User");
const generateLatest12MonthsData = require("../utils/generateLatest12MonthsData");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// get users analytics ("admin")
exports.getUsersAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const users = await generateLatest12MonthsData(User);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
});

// get courses analytics ("admin")
exports.getCoursesAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const courses = await generateLatest12MonthsData(Course);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
});

// get courses analytics ("admin")
exports.getBootcampAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const Bootcamps = await generateLatest12MonthsData(Bootcamp);

    res.status(200).json({
      success: true,
      Bootcamps,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
});
