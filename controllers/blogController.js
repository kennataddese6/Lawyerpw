const fs = require("fs");
const path = require("path");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const Blog = require("../models/blogModel.js");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create({
    BlogTitle: req.body?.BlogTitle,
    BlogType: req.body?.BlogType,
    BlogDescription: req.body?.BlogDescription,
    BlogImage: req.file?.path,
  });
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(400).json("Something went wrong");
  }
});

const getBlogs = asyncHandler(async (req, res) => {
  const blog = await Blog.find();
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(400).json("Something went wrong");
  }
});

const deleteBlogs = asyncHandler(async (req, res) => {
  const Blog = await Blog.findById(req.body._id);

  if (Blog) {
    try {
      await unlinkAsync(Blog.BlogImage);

      await Blog.deleteOne({ _id: req.body._id });
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete blog" });
    }
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
});
module.exports = {
  createBlog,
  getBlogs,
  deleteBlogs,
};
