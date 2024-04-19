const fs = require("fs");
const path = require("path");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const News = require("../models/newsModel.js");
const asyncHandler = require("express-async-handler");

const createNews = asyncHandler(async (req, res) => {
  const news = await News.create({
    NewsTitle: req.body?.NewsTitle,
    NewsCategory: req.body?.NewsCategory,
    NewsDescription: req.body?.NewsDescription,
    NewsImage: `${process.env.UPLOAD_PATH}` + req.file?.filename,
  });
  if (news) {
    res.status(200).json(news);
  } else {
    res.status(400).json("Something went wrong");
  }
});

const getNews = asyncHandler(async (req, res) => {
  const news = await News.find();
  if (news) {
    res.status(200).json(news);
  } else {
    res.status(400).json("Something went wrong");
  }
});

const deleteNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.body._id);

  if (news) {
    try {
      await unlinkAsync(news.NewsImage);

      await News.deleteOne({ _id: req.body._id });
      res.status(200).json({ message: "News deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete news" });
    }
  } else {
    res.status(404).json({ message: "News not found" });
  }
});
module.exports = {
  createNews,
  getNews,
  deleteNews,
};
