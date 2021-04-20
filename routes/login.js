var express = require('express');
var router = express.Router();
var dataHelper = require('../middleware/data.midleware');
var loginController = require("../Controller/login.controller");
var cookies = require('../middleware/cookies.middleware');

router.get("/", loginController.getLoginPage);

router.post("/", 
        loginController.getLoginInfo, 
        dataHelper.readData, 
        loginController.validate,
        cookies.saveLoginCookie
);

module.exports = router;