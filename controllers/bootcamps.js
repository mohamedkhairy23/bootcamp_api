// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show All Bootcamps" });
};

// @desc     Get a single bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Display a Bootcamp ${req.params.id}` });
};

// @desc     Create a new bootcamp
// @route    POSt /api/v1/bootcamps
// @access   Private
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({ success: true, msg: "Create New Bootcamps" });
};

// @desc     Update a bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a Bootcamp ${req.params.id}` });
};

// @desc     Delete a bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a Bootcamp ${req.params.id}` });
};
