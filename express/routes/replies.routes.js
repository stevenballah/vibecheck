const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all replies in the database
router.get("/replies/all", async (req, res) => {
    const replies = await db.replies.findAll({
        include: [{model: db.replies, as: "user"}]
    });
    res.send(replies);
});

// Create new reply
router.post("/replies/new", async (req, res) => {
    const replies = await db.replies.create({
        reply_id: req.body.reply_id,
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        message: req.body.message,
        timestamp: req.body.timestamp
    });
    res.send(replies);
})

// Delete a reply
router.delete("/replies/:reply_id", (req, res) => {
    db.posts.destroy({
        where: {
            reply_id: req.params.reply_id
        }
    }).then(() => res.send("user deleted"));
})

module.exports = router;