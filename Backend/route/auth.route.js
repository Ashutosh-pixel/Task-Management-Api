const express = require('express');
const signup = require('../controller/signup.controller');
const checkEntry = require('../utils/checkentry.util');
const checkLoginEntry = require('../utils/checkloginentry');
const Login = require('../controller/login.controller');
const Logout = require('../controller/logout.controller');
const route = express.Router();

route.post('/signup', checkEntry, signup);
route.post('/login', checkLoginEntry, Login);
route.post('/logout', Logout);


module.exports = route