var express = require('express');
var router = express.Router();
var data = require('../data/data.json');
var userController = require('../Controller/user.controller');

/* GET home page. */
router.get('/', userController.readData, userController.getUserInfo);

module.exports = router;
