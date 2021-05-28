var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/g/:account',function (req,res, next) {
    var path = process.cwd()+"/public/user_public/"+req.params.account+"/guess.html";
    res.sendFile(path);
});

router.get('/', function(req,res,next){
    res.render("index");
});

module.exports = router;
