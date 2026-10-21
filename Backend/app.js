const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

const User = require("./db/db.js");

const auth = require("./middleware/auth.js");

mongoose.connect("mongodb://127.0.0.1:27017/Ai_interview_platform")
.then(() =>{
    console.log("Database connected successfully");
})
.catch((err) =>{
    console.log(err);
})



app.use(require("./routes/signup.js"));
app.use(require("./routes/login.js"));
app.use("/auth", require("./routes/authRoutes.js"));
app.use(require("./routes/interview.js"));


app.get("/profile-test", auth, (req, res) => {
    res.json({
        message: "Authentication successful",
        user: req.user
    });
});

app.listen(4000, () => {
    console.log("server running on port 4000......");
})