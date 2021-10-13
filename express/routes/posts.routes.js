const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all posts in the database
router.get("/posts/all", async (req, res) => {
    const posts = await db.posts.findAll({
        include: [{model: db.users, as: "user"}, {model: db.replies, as: "replies", include: {model: db.users, as: "user"}}]
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
        timestamp: req.body.timestamp
    });
    res.send(post);
})

// Get a single post using ID
router.get("/posts/get/:post_id", async (req, res) => {
    const post = await db.posts.findOne({
        where: {
            post_id: req.params.post_id
        },
        include: [{model: db.users, as: "user"}, {model: db.replies, as: "replies", include: {model: db.users, as: "user"}}]
    });
    res.send(post);
})

// Delete a post
router.delete("/posts/delete/:post_id", (req, res) => {
    db.posts.destroy({
        where: {
            post_id: req.params.post_id
        }
    });
})

// Edit a post
router.put("/edit/:user_id", (req, res) => {
    db.posts.update(
        {
            post_id: req.body.post_id,
            user_id: req.body.user_id,
            title: req.body.title,
            message: req.body.message,
            image_url: req.body.image_url,
            timestamp: req.body.timestamp
        },
        {
            where: {
                post_id: req.params.post_id
            }
        },
        
    ).then(() => res.send("changes made"))
})

module.exports = router;