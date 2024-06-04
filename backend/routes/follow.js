const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { follow, unfollow, getFollowerList, getFollowingList } = require('../controllers/follow.js');

const router = express.Router();

router.post('/follow', isLoggedIn, follow);

router.post('/unfollow', isLoggedIn, unfollow);

router.post('/getfollowerlist', isLoggedIn, getFollowerList);

router.post('/getfollowinglist', isLoggedIn, getFollowingList);

module.exports = router;