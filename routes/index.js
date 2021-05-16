var express = require('express');
var router = express.Router();
var dataHelper = require('../middleware/data.midleware');
var fs = require('fs');

/* GET home page. */
router.get('/g/:account',function (req,res, next) {
    var path = process.cwd()+"/data/"+req.params.account+"/guess.html";
    res.sendFile(path);
});

router.get('/', function(req,res,next){
    res.sendFile(process.cwd()+"/data/quyetthang/data.json");
});

module.exports = router;
