const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Show All Bootcamps" });
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Display a Bootcamp ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ success: true, msg: "Create New Bootcamps" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a Bootcamp ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a Bootcamp ${req.params.id}` });
});

module.exports = router;
