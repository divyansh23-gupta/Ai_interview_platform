const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let authHeader = req.headers.authorization;

    console.log(authHeader, "Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Please login first");
    }

    let token = authHeader.split(" ")[1];

    try {
        let decoded = jwt.verify(token, "ai_interview_secret");

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
};

module.exports = auth;