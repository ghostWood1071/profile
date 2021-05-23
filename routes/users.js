var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var DBHelper = require('../helper/DBHelper');
var mailer = require('nodemailer');
var TokenHelper = require('../helper/TokenHelper');

var helper = new DBHelper('ADMIN', 'sa','111', 'profiledb');
var tokenHelper = new TokenHelper("profileproject@secret111");

router.get('/', function(req,res,next){
    if(req.signedCookies.uid == undefined){
        res.redirect("/login");
        return;
    }
    var publicPath = req.signedCookies.pubPath;
    var privatePath = req.signedCookies.uid;
    var user  = JSON.parse(fs.readFileSync(process.cwd()+"\\data\\"+privatePath+"\\data.json", {encoding: "utf-8"}));
    res.render(user.template.name, {
        template: user.template,
        avatar: user.avatar,
        about: user.about,
        research_interest: user.research_interests,
        academic: user.academic,
        teaching: user.teaching,
        thesis: user.thesis,
        research_grant: user.research_grant,
        public: user.publications,
        path: "/user_public/"+publicPath+"/",
        news: user.news
    });
        
});

router.post('/',function(req, res, next){
    var newUser = JSON.parse(req.body.content);
    var dataPath = process.cwd()+"\\data\\"+req.signedCookies.uid+"\\data.json"
    var oldUser  = JSON.parse(fs.readFileSync(dataPath, {encoding: "utf-8"}));
    
    oldUser.template = newUser.template;
    oldUser.avatar = newUser.avatar;
    oldUser.about  = newUser.about;
    oldUser.research_interests = newUser.research_interests;
    oldUser.academic = newUser.academic;
    oldUser.teaching = newUser.teaching;
    oldUser.thesis = newUser.thesis;
    oldUser.research_grant = newUser.research_grant;
    oldUser.publications = newUser.publications;
    oldUser.news = newUser.news;

    try {
        fs.writeFileSync(dataPath, JSON.stringify(oldUser));
        res.send({
            head: true,
            message:"save sucess"
        });
    } catch (error) {
        console.log(error);
        res.send({
            head: false,
            message: "data was not save"
        });
    } 
});

router.post('/upfile', function (req,res,next) {  
    var path = process.cwd()+"/public/user_public/"+req.signedCookies.pubPath+"/";
    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = path + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });


    res.send({
        head: true,
        message: "upload file sucess"
    });
});

router.post('/createguess', function(req, res, next){
    var data = req.body.data;
    fs.writeFile(process.cwd()+"/public/user_public/"+req.signedCookies.pubPath+"/guess.html", data, {encoding: 'utf-8'},function(err){
        if(err){
            console.log(err);
            res.send({
                head: false,
                message: "create guess's page failed"
            });
            
        }else
            res.send({
                head: true,
                message: "create guess's page failed"
            });
    });
});

router.post("/passverify", async function(req,res, next){
    var uid = req.signedCookies.uid;
    var pass = req.body.currentPass;
    var query = `select account from Account where id = '${uid}' and password = '${pass}'`;
    try{
        var result = await helper.excuteQuerry(query);
        if(result.recordset.length>0){
            res.send({
                head: true,
                message: "account existed"
            });
            return;
        }
        res.send({
            head: false,
            message: "password wrong"
        });
    } catch(queryErr){
        console.log(queryErr);
        res.send({
            head: false,
            message: "password wrong"
        });
    }
}); 

router.get("/sendMail",function(req, res, next){
    res.render("email");
});

router.post("/sendMail", async function(req, res, next){
    var email = req.body.email;
    try{
        var result = await helper.excuteQuerry(`select account from Account where email = '${email}'`);
        if(result.recordset.length==0){
            res.send({
                head: false,
                message: "your email not found"
            });
            return;
        }
        
    } catch(err){
        console.log(err);
        res.send({
            head: false,
            message: "can't find your email"
        });
    }
});

router.get("/changePass",function(req,res, next){
    
});

router.post("/changePass",function(req, res, next){
    
});


module.exports = router;

