const mongoose = require("mongoose");
const asyncHandler = require("../middleware/async");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a review title"],
    maxLength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    if (obj[0]) {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageRating: obj[0].averageRating.toFixed(1),
      });
    } else {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageRating: undefined,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post("save", async function () {
  await this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageRating after remove ///////////
ReviewSchema.post("deleteOne", { document: true }, async function () {
  await this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageRating after rating update
ReviewSchema.post("findOneAndUpdate", async function (doc) {
  if (this.rating != doc.rating) {
    await doc.constructor.getAverageRating(doc.bootcamp);
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
