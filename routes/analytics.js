const express = require("express");
const {
  getUsersAnalytics,
  getBootcampAnalytics,
  getCoursesAnalytics,
} = require("../controllers/analytics");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/get-users-analytics",
  protect,
  authorize("admin"),
  getUsersAnalytics
);

router.get(
  "/get-bootcamps-analytics",
  protect,
  authorize("admin"),
  getBootcampAnalytics
);

router.get(
  "/get-courses-analytics",
  protect,
  authorize("admin"),
  getCoursesAnalytics
);

module.exports = router;
