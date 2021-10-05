const express = require("express");
const router = express.Router();
const db = require("../models");
const argon2 = require("argon2");

// Get all users in the database
router.get("/all", (req, res) => {
    db.users.findAll().then(users => res.send(users))
});

// Create new user
router.post("/signup", async (req, res) => {
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

    const user = await db.users.create({
        user_id: req.body.user_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        account_created: req.body.account_created,
        profile_pic_url: req.body.profile_pic_url
    });
    res.send(user);
})

// Login user
router.post("/login", async (req, res) => {
    const user = await db.users.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user === null || await argon2.verify(user.password, req.body.password) === false) {
        //NOT VERIFIED
        res.send(null);
    } else {
        res.send(user);
    }
})

// Check email if registered
router.post("/checkEmail", async (req, res) => {
    const user = await db.users.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user === null) {
        //DOES NOT EXIST
        res.send(false);
    } else {
        res.send(true);
    }
})

// Get single user by email
router.get("/user/:email", async (req, res) => {
    //SELECT A USER WITH EMAIL
    const user = await db.users.findOne({
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

// Update profile picture
router.put("/uploadProfilePic/:user_id", (req, res) => {
    db.users.update(
        {
            profile_pic_url: req.body.profile_pic_url
        },
        {
            where: {
                user_id: req.params.user_id
            }
        }, 
    );
})

module.exports = router;