const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { writeDiary, getDiary } = require('../controllers/diary.js');

const router = express.Router();

router.post('/writediary', isLoggedIn, writeDiary);

router.post('/getdiary', isLoggedIn, getDiary);

module.exports = router;