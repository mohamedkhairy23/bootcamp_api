const express = require("express");

const User = require("../models/User");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  searchUsers,
} = require("../controllers/users");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), searchUsers, getUsers)
  .post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
