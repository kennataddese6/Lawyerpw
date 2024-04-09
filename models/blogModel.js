const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    BlogTitle: {
      type: String,
    },
    BlogType: {
      type: String,
    },
    BlogDescription: {
      type: String,
    },
    BlogImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
