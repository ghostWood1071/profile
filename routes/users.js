var express = require('express');
var router = express.Router();
var loginController = require('../Controller/login.controller');
var userController = require('../Controller/user.controller');

router.get("/login", loginController.getLoginPage);

router.post("/", 
        loginController.getLoginInfo, 
        userController.readData, 
        loginController.validate,
        userController.getUserInfo
);
router.get('/', userController.readData, userController.getUserInfo);


module.exports = router;

