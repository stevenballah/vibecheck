const express = require("express");
const router = express.Router();
const db = require("../models");
const argon2 = require("argon2");

// Get all users in the database
router.get("/users/all", async (req, res) => {
    const users = await db.users.findAll({
        include: [{model: db.following}],
        attributes: ["user_id", "firstname", "lastname", "profile_pic_url", "email", "account_created"]
    });
    res.send(users);
});

// Create new user
router.post("/users/signup", async (req, res) => {
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
router.post("/users/login", async (req, res) => {
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

// Check if email is registered (taken)
router.post("/users/checkEmail", async (req, res) => {
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
router.get("/users/user/:email", async (req, res) => {
    //SELECT A USER WITH EMAIL
    const user = await db.users.findOne({
        where: {
            email: req.params.email
        }
    });
    res.send(user);
})

// Delete user
router.delete("/users/delete/:user_id", (req, res) => {
    db.users.destroy({
        where: {
            user_id: req.params.user_id
        }
    });
})

// Update firstname and lastname
router.put("/users/edit/name/:user_id", (req, res) => {
    db.users.update(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        },
        {
            where: {
                user_id: req.params.user_id
            }
        },
        
    );
})

// Update email
router.put("/users/edit/email/:user_id", (req, res) => {
    db.users.update(
        {
            email: req.body.email
        },
        {
            where: {
                user_id: req.params.user_id
            }
        },
        
    );
})

// Update password
router.put("/users/edit/password/:user_id", async (req, res) => {
    //GET THE USER BASED ON USER_ID
    const user = await db.users.findOne({
        where: {
            user_id: req.body.user_id
        }
    });

    //VERIFY PASSWORD
    if (user === null || await argon2.verify(user.password, req.body.oldpassword) === false) {
        res.send(false);
    } else {
        //IF VERIFY PASSES UPDATE

        const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

        db.users.update(
            {
                password: hash
            },
            {
                where: {
                    user_id: req.params.user_id
                }
            },
            
        );
        res.send(true);
    }
    
})

// Update profile picture
router.put("/users/uploadProfilePic/:user_id", (req, res) => {
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