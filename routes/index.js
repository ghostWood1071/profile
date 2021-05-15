var express = require('express');
var router = express.Router();
var dataHelper = require('../middleware/data.midleware');
var fs = require('fs');

/* GET home page. */
router.get('/g/:account',function (req,res, next) {
    // var data = JSON.parse(res.locals.stringData);
    // var user = data.find(x=>x.login.account === req.params.account);
    // res.render('guess/guess-'+user.template.name, {
    //     template: user.template,
    //     avatar: user.avatar,
    //     about: user.about,
    //     research_interest: user.research_interests,
    //     academic: user.academic,
    //     teaching: user.teaching,
    //     thesis: user.thesis,
    //     research_grant: user.research_grant,
    //     public: user.publications
    // });
    try {
        var dataPath = process.cwd()+"\\data\\"+req.params.account+"\\data.json";
        var user = JSON.parse(fs.readFileSync(dataPath, {encoding: "utf-8"}));
        // res.render('guess/guess-'+user.template.name, {
        //     template: user.template,
        //     avatar: user.avatar,
        //     about: user.about,
        //     research_interest: user.research_interests,
        //     academic: user.academic,
        //     teaching: user.teaching,
        //     thesis: user.thesis,
        //     research_grant: user.research_grant,
        //     public: user.publications
        // });
        res.render('guess/test', {
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
    } catch (error) {
        res.redirect("/"+req.params.account);
    }
    
});

router.get('/', function(req,res,next){
    res.sendFile(process.cwd()+"/data/quyetthang/data.json");
});

module.exports = router;
