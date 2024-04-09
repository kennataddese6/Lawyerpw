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

module.exports = {
  createPost,
  getPosts,
};
