const express = require('express');
const bcryptjs = require('bcryptjs');


const User = require("../db/db.js");

const router = express.Router();

router.post("/signup", async(req,res) => {



    let {name , email , password} = req.body;

    if(!name || !email || !password){
        return res.status(400).send("All fields are required");
    }

    try{

    let existingUser = await  User.findOne({email});

    if(existingUser){
        return res.status(400).send("User already exists");
    }

    let hashedPassword = await bcryptjs.hash(password,10);

    let user = new User({
        name,
        email,
        password: hashedPassword
    })

    await user.save();

    res.status(200).send("User created successfully");

    } catch (error) {
    
        console.error(error);
    res.status(500).send("Internal server error");

    }



    
});

module.exports = router;