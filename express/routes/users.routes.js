const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all users in the database
router.get("/all", (req, res) => {
    db.users.findAll().then(users => res.send(users))
});

// Create new user
router.post("/new", async (req, res) => {
    const user = await db.users.create({
        user_id: req.body.user_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        account_created: req.body.account_created,
        profile_pic_url: req.body.profile_pic_url
    });
    res.send(user);
})

// Get single user by email
router.get("/user/:email", async (req, res) => {
    //SELECT A USER WITH EMAIL
    const user = await db.users.findAll({
        where: {
            email: req.params.email
        }
    });
    res.send(user);
})

// Delete user
router.delete("/delete/:user_id", (req, res) => {
    db.users.destroy({
        where: {
            user_id: req.params.user_id
        }
    }).then(() => res.send("user deleted"));
})

// Update user info
router.put("/edit/:user_id", (req, res) => {
    db.users.update(
        {
            user_id: req.body.user_id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        },
        {
            where: {
                user_id: req.params.user_id
            }
        },
        
    ).then(() => res.send("changes made"))
})

module.exports = router;