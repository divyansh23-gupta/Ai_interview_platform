const express = require("express");
const router = express.Router();

const Interview = require("../db/Interview.js");
const auth = require("../middleware/auth.js");

router.post("/interview", auth, async (req, res) => {
  const {experience,role,difficulty,interviewType,numberOfQuestions,questions,} = req.body;

  try {
    if ( !experience || !role || !difficulty || !interviewType || !numberOfQuestions || !questions) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const interview = await Interview.create({
      userId: req.user.userId,
      experience,
      role,
      difficulty,
      interviewType,
      numberOfQuestions,
      questions,
    });

    return res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (err) {
    console.error("Interview creation error:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});




router.get("/interview",auth,async (req,res) =>{
    try{
        const interviews = await Interview.find({
            userId : req.user.userId,

        }).sort({ createdAt: -1 });

        return res.status(200).json({
            count : interviews.length,
            interviews : interviews
        });
    }
    catch(err){
        return res.status(500).json({
            error: "Internal server error",
        });
    }
})

module.exports = router;