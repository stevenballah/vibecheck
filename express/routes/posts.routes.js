const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all posts in the database
router.get("/posts/all", async (req, res) => {
  const posts = await db.posts.findAll({
    include: [
      {
        model: db.users,
        as: "user",
        attributes: ["user_id", "firstname", "lastname", "profile_pic_url"],
      },
      { model: db.post_likes },
      { model: db.post_dislikes },
      {
        model: db.replies,
        as: "replies",
        include: {
          model: db.users,
          as: "user",
          attributes: ["user_id", "firstname", "lastname", "profile_pic_url"],
        },
      },
    ],
  });
  res.send(posts);
});

// Create new post
router.post("/posts/new", async (req, res) => {
  const post = await db.posts.create({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    title: req.body.title,
    message: req.body.message,
    image_url: req.body.image_url,
    timestamp: req.body.timestamp,
  });
  res.send(post);
});

// Get a single post using ID
router.get("/posts/get/:post_id", async (req, res) => {
  const post = await db.posts.findOne({
    where: {
      post_id: req.params.post_id,
    },
    include: [
      { model: db.users, as: "user" },
      {
        model: db.replies,
        as: "replies",
        include: { model: db.users, as: "user", attributes: ["user_id", "firstname", "lastname", "profile_pic_url"] },
      },
    ],
  });
  res.send(post);
});

// Delete a post
router.delete("/posts/delete/:post_id", (req, res) => {
  db.posts.destroy({
    where: {
      post_id: req.params.post_id,
    },
  });
});

// Edit a post
router.put("/posts/edit/:post_id", async (req, res) => {
  const updatePost = db.posts
    .update(
      {
        title: req.body.title,
        message: req.body.message,
        timestamp: req.body.timestamp,
      },
      {
        where: {
          post_id: req.params.post_id,
        },
      }
    );
    res.send(updatePost);
});

module.exports = router;
