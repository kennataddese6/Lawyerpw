const Post = require("../models/postModel.js");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  const post = Post.create({
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

module.exports = {
  createPost,
};
