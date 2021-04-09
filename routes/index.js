var express = require('express');
var router = express.Router();
var data = require('../data/data.json');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = data[0];
  res.render('index', {
    avatar: user.avatar,
    about: user.about,
    research_interst: user.research_interests,
    academic: user.academic,
    teaching: user.teaching,
    thesis: user.thesis,
    research_grant: user.research_grant,
    public: user.publications
  });
});

router.post("/posted", function(req, res, next){
  res.send(req.body);
});


module.exports = router;
