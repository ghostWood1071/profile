var express = require('express');
var router = express.Router();
var userController = require('../Controller/user.controller');
var dataHelper = require('../middleware/data.midleware');
var loginController = require('../Controller/login.controller');


router.get('/', loginController.auth, dataHelper.readData, userController.getUserInfo);
router.post('/', function(req,res,next){
    res.send(req.body);
})
module.exports = router;

