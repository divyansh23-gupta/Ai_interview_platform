const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const User = require("../db/db.js");

const router = express.Router();

const client = new OAuth2Client('654176491149-6auku1j5q4l689omccnkqgm5n2uj7cic.apps.googleusercontent.com');

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }


    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: "654176491149-6auku1j5q4l689omccnkqgm5n2uj7cic.apps.googleusercontent.com",
    });


    const payload = ticket.getPayload();

    const {
      sub: googleId,
      name,
      email,
      picture,
    } = payload;


    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId,
        name,
        email,
        profilePicture: picture,
      });
    }

 
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      "ai_interview_secret",
     
    );

    res.status(200).json({
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
  
      },
    });
  } catch (error) {
    console.log("Google Login Error:", error);

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
});

module.exports = router;