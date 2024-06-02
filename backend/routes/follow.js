const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { follow, unfollow } = require('../controllers/follow.js');

const router = express.Router();

router.post('/follow', isLoggedIn, follow);

router.post('/unfollow', isLoggedIn, unfollow);

module.exports = router;