const mongoose = require("mongoose");
const User = require("./user");

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const itemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    availableStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
