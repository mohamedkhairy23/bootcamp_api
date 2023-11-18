const express = require("express");
const { getReviews, getReview, addReview } = require("../controllers/reviews");
const Review = require("../models/Review");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp user",
      select: "name description email",
    }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

router.route("/:id").get(getReview);
// .put(protect, authorize("publisher", "admin"), updateCourse)
// .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
