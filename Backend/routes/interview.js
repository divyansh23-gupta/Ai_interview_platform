let express = require("express")
let router = express.Router()
let interview = require("../db/interview")

router.post('/interview',auth ,async (req, res) => {

    let {experience ,role ,difficulty ,interviewType ,numberOfQuestions ,questions} = req.body;

    try{
        if(!experience || !role || !difficulty || !interviewType || !numberOfQuestions || !questions){
            return res.status(400).json({error: "All fields are required"});
        }

        await interview.create({
            experience,
            role,
            difficulty,
            interviewType,
            numberOfQuestions,
            questions
        })
        return res.send("Interview created successfully");

    }
    catch(err){
        return res.status(500).json({error: "Internal server error"});
    }

})