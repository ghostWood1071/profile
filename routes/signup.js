var express = require('express');
var route = express.Router();
var signupController = require('../Controller/signup.controller');
var dataHelper = require('../middleware/data.midleware');
var cookies = require('../middleware/cookies.middleware')
route.get('/',cookies.clearCookie, signupController.getSignUpPage);
route.post('/', signupController.getSignUpInfo, dataHelper.readData, signupController.validate);

module.exports = route;
