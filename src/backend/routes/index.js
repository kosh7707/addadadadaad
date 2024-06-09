const express = require("express");
const path = require("path");
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res, next) => {
    try {
        return res.status(403).json({ message: `x` });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;