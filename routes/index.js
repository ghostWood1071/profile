var express = require('express');
var router = express.Router();
var dataHelper = require('../middleware/data.midleware');

/* GET home page. */
router.get('/guess/:account', dataHelper.readData,function (req,res, next) {
    var data = JSON.parse(res.locals.stringData);
    var user = data.find(x=>x.login.account === req.params.account);
    res.render('guess/guess-'+user.template.name, {
        template: user.template,
        avatar: user.avatar,
        about: user.about,
        research_interest: user.research_interests,
        academic: user.academic,
        teaching: user.teaching,
        thesis: user.thesis,
        research_grant: user.research_grant,
        public: user.publications
    });
});


module.exports = router;
