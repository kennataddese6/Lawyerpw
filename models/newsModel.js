const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    NewsTitle: {
      type: String,
    },
    NewsType: {
      type: String,
    },
    NewsDescription: {
      type: String,
    },
    NewsImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema);
