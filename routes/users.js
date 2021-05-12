var express = require('express');
var router = express.Router();
var userController = require('../Controller/user.controller');
var dataHelper = require('../middleware/data.midleware');
var loginController = require('../Controller/login.controller');


router.get('/', loginController.auth, userController.getUserInfo);
router.post('/',userController.saveData);

module.exports = router;

