const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

// @desc     Get reviews
// @route    GET /api/v1/reviews
// @route    GET /api/v1/bootcamps/:bootcampId/reviews
// @access   Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    }).populate({
      path: "user",
      select: "name email",
    });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc     Get a single review
// @route    GET /api/v1/reviews/:id
// @access   Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate({
      path: "bootcamp",
      select: "name description",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc     Add  review
// @route    POST /api/v1/reviews/:bootcampId/reviews
// @access   Private
exports.addReview = asyncHandler(async (req, res, next) => {
  // Add bootcamp to req.body by bootcamp ID
  req.body.bootcamp = req.params.bootcampId;

  // Add logged in user to req.body
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404)
    );
  }

  const alreadyReviewed = await Review.findOne({
    bootcamp: req.params.bootcampId,
    user: req.user.id,
  });

  if (alreadyReviewed) {
    return next(
      new ErrorResponse(`You already added review on this bootcamp`, 401)
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});
