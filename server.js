const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/uploads", (req, res, next) => {
  const dirPath = path.join(__dirname, "/uploads");

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
    } else {
      console.log(`Directory contents: ${files}`);
    }
  });

  express.static(dirPath)(req, res, next);
});
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/blogCategory", require("./routes/blogCategoryRoutes"));
app.use("/api/newsCategory", require("./routes/newsCategoryRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));

console.log(path.join(__dirname, "/uploads"));

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
