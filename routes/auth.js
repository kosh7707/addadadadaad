const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { register, login, logout } = require('../controllers/auth');

const router = express.Router();

router.post('/register', isNotLoggedIn, register);

router.post('/login', isNotLoggedIn, login);

router.get('/logout', isLoggedIn, logout);

module.exports = router;