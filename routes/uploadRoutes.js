const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const ErrorResponse = require("../utils/errorResponse");
const { protect } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    if (extname !== ".png" && extname !== ".jpg" && extname !== ".jpeg") {
      return cb(new ErrorResponse(`Please upload only an image file`, 400));
    }
    cb("Images Only");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  "/uploadSingleFile",
  protect,
  upload.single("image"),
  (req, res) => {
    res.send({
      message: "Image Uploaded Successfully",
      image: `/${req.file.path}`,
    });
  }
);

router.post(
  "/uploadMultipleImages",
  protect,
  upload.array("images", 12),
  function (req, res, next) {
    res.send({
      message: "Images Uploaded Successfully",
      images: req.files.map((file) => {
        return `/${file.path}`;
      }),
    });
  }
);

module.exports = router;
