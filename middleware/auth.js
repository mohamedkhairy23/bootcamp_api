const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //   else if (req.cookies.token) {
  //     token = req.cookies.token;
  //   }

  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // decoded.id =======> This id of a logged in or registered user that coming and stored in a token and here I destruct it from a token
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} ${req.user.role} is unauthorized to access this route`,
          401
        )
      );
    }
    next();
  };
};
