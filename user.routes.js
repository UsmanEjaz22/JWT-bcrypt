const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router();


const user = {
    username : "admin",
    password : bcrypt.hashSync("123456", 10)        // hashed password
}


// login route: generate token
router.post("/login", (req, res) => {
    const {username, password} = req.body;

    // checking for correct user and password
    if (username !==user.username || !bcrypt.compareSync(password.user.password)){
        return res.status(401).json({message: "Invalid credentials"});
    }

    // create token
    const token = jwt.sign({username}, "secretKey", {expiresIn: "1h"});
    res.json({token});
});

// protected route middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({message: "Token missing"})

    jwt.verify(token, "secretKey", (err, user) => {
        if (err) return res.status(403).json({message: "Token invalid"});

        req.user = user
        next();
    })
}

// protected route
router.get("/dashboard", authenticate, (req, res) => {
    res.json({message: `Welcome ${req.user.username} to the dashboard`})
})

module.exports = router;