const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../db/db.js");

const router = express.Router();

router.post("/login", async (req,res) => {

    try{

    let {email, password} = req.body;
    console.log(req.body);
    console.log(email, !!password);

     if(!email || !password){
         return res.status(400).send("All fields are required");
    }

    let user = await User.findOne({email});
    if(!user){
        return res.status(400).send("Invalid credentials");
    }


    let validPassword = await bcryptjs.compare(password , user.password);
    if(!validPassword){
        return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign(

        {
            userId : user._id,
            email : user.email
        },
        "ai_interview_secret",
        {
            expiresIn : "1h"
        }
    );
    res.status(200).json({
        message : "Login successful",
        token : token
    });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
