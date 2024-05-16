const express = require("express");
const path = require("path");
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            res.send("is Logged in");
        }
        else {
            res.send("is not Logged in");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;