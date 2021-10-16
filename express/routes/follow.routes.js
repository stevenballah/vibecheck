const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/follow", async (req, res) => {
    const follow = await db.following.create({
        following_id: req.body.following_id,
        user_id: req.body.user_id,
        timestamp: req.body.timestamp
    });
    res.send(follow);
})

router.post("/unfollow", async (req, res) => {
    await db.following.destroy({
        where: {
            following_id: req.body.following_id,
            user_id: req.body.user_id
        }
    });
})

//GET ALL A USER IS FOLLOWING
router.get("/following/all/:user_id", async (req, res) => {
    const allfollowing = await db.following.findAll({
        where: {
            user_id: req.params.user_id
        }
    });
    res.send(allfollowing);
})

//GET A USERS FOLLOWERS
router.get("/followers/all/:following_id", async (req, res) => {
    const allfollowers = await db.following.findAll({
        where: {
            following_id: req.params.following_id
        }
    });
    res.send(allfollowers);
})
module.exports = router;