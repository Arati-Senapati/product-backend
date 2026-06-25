const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// 🔥 IMPORTANT INDEXES (for speed)
productSchema.index({ updated_at: -1, _id: -1 });
productSchema.index({ category: 1, updated_at: -1 });

module.exports = mongoose.model("Product", productSchema);