const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide product name"],
    maxlength: [100, "Name can not be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxlength: [1000, "Description can not be more than 1000 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
    enum: ["office", "kitchen", "bedroom"],
  },
  company: {
    type: String,
    required: [true, "Please provide company"],
    enum: {
      values: ["ikea", "liddy", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  freeShipping: {
    type: Boolean,
    required: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
