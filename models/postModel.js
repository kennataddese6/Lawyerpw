const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    PostTitle: {
      type: String,
    },
    PostType: {
      type: String,
    },
    PostDescription: {
      type: String,
    },
    PostImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
