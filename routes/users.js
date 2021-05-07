var express = require('express');
var router = express.Router();
var userController = require('../Controller/user.controller');
var dataHelper = require('../middleware/data.midleware');
var loginController = require('../Controller/login.controller');


router.get('/', loginController.auth, dataHelper.readData, userController.getUserInfo);
router.post('/',dataHelper.readData ,userController.saveData, dataHelper.writeData, userController.saveSuccess);

module.exports = router;

