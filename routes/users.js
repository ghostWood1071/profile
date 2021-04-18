var express = require('express');
var router = express.Router();

var userController = require('../Controller/user.controller');

router.get("/login", userController.getLoginPage);

router.post("/login", 
        userController.getLoginInfo, 
        userController.readData, 
        userController.validate,
        userController.saveLoginCookie
);

router.get('/signup', function (req, res, next) {
        res.render('signup');     
});
router.get('/', userController.auth, userController.readData, userController.getUserInfo);


module.exports = router;

