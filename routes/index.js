var express = require('express');
var router = express.Router();
var userController = require('../Controller/user.controller');

/* GET home page. */
router.get('/',function (req,res, next) {
    res.send('index');
});


module.exports = router;
