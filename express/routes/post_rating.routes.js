const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all likes
router.get("/post_likes/all/:user_id", async (req, res) => {
    const post_likes = await db.post_likes.findAll({
        where: {
            user_id: req.params.user_id
        }
    });
    res.send(post_likes);
  });

// Post a like
router.post("/post_like/new", async (req, res) => {
    const post_likes = await db.post_likes.create({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        timestamp: req.body.timestamp
    });
    res.send(post_likes);
})

// Remove a post like
router.delete("/post_like/delete/:post_id/:user_id", (req, res) => {
    db.post_likes.destroy({
        where: {
            post_id: req.params.post_id,
            user_id: req.params.user_id
        }
    });
})

// Post a dislike
router.post("/post_dislike/new", async (req, res) => {
    const post_dislikes = await db.post_dislikes.create({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        timestamp: req.body.timestamp
    });
    res.send(post_dislikes);
})

// Remove a post dislike
router.delete("/post_dislike/delete/:post_id/:user_id", (req, res) => {
    db.post_dislikes.destroy({
        where: {
            post_id: req.params.post_id,
            user_id: req.params.user_id
        }
    });
})

module.exports = router;