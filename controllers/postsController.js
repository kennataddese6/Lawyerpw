const fs = require("fs");
const path = require("path");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const Post = require("../models/postModel.js");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create({
    PostTitle: req.body.PostTitle,
    PostType: req.body.PostType,
    PostDescription: req.body.PostDescription,
    PostImage: req.file.path,
  });
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(400).json("Something went wrong");
  }
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getNews = asyncHandler(async (req, res) => {
  const posts = await Post.find({ PostType: "News" });
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getBlogs = asyncHandler(async (req, res) => {
  const posts = await Post.find({ PostType: "Blog" });
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body._id);

  if (post) {
    try {
      await unlinkAsync(post.PostImage);

      await Post.deleteOne({ _id: req.body._id });
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete post" });
    }
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
module.exports = {
  createPost,
  getPosts,
  deletePost,
  getNews,
  getBlogs,
};
