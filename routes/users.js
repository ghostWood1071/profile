var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var DBHelper = require('../helper/DBHelper');
var mailer = require('nodemailer');
var TokenHelper = require('../helper/TokenHelper');
var dotenv = require('dotenv').config();
var Encoder = require('../helper/Encoder');
var MailSender = require('../helper/MailSender');
var md5 = require('md5');



var helper = new DBHelper(process.env.DB_SERVER, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
var tokenHelper = new TokenHelper();
var encoder = new Encoder(process.env.CRYPTO_SECRET);
var mailSender = new MailSender();


router.get('/', function(req,res,next){
    if(req.signedCookies.uid == undefined){
        res.redirect("/login");
        return;
    }
    var publicPath = req.signedCookies.pubPath;
    var privatePath = encoder.decode(req.signedCookies.uid);
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
    var uid = encoder.decode(req.signedCookies.uid);
    var dataPath = process.cwd()+"\\data\\"+uid+"\\data.json"
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
    var uid = encoder.decode(req.signedCookies.uid);
    var pass = req.body.currentPass;
    
    try{
        var query = `select account from Account where id = '${uid}' and password = '${md5(pass)}'`;
        var result = await helper.excuteQuerry(query);
        if(result.recordset.length>0){
            res.send({
                head: true,
                message: "correct password"
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

router.post("/changepassword", async function(req, res, next){
    try{
      var password = md5(req.body.password);
      var uid = encoder.decode(req.signedCookies.uid);
      var cahngeQuery = `update Account set password = '${password}' where id = '${uid}'`;
      var result = await helper.excuteQuerry(cahngeQuery);
      if(result.rowsAffected[0] != 1){
          res.send({head: false, message: "cant't change your password"});
          return;
      }
      res.send({head: true, message: "change password sucessfully"});
    } catch(err){
        console.log(err);
        res.send({head: false, message: "cant't change your password"});
    }   
});

router.get("/emailVerify",function(req, res, next){
    res.render("email");
});

router.post("/emailVerify", async function(req, res, next){
    var email = req.body.email;
    try{
        var result = await helper.excuteQuerry(`select * from Account where email = '${email}'`);
        if(result.recordset.length!=1){
            res.send({
                head: false,
                message: "your email not found"
            });
            return;
        }

        //create token
        var token = await tokenHelper.encode(JSON.stringify({
            ID: result.recordset[0].id,
            pass: result.recordset[0].password
        }), '15m');

        //add pending token
        var insertToken = `insert into PendingToken(userId,token) values('${result.recordset[0].id}', '${token}')`;
        var insertTokenRessult = await helper.excuteQuerry(insertToken);
        if(insertTokenRessult.rowsAffected[0] == 0){
            res.send({
                head: false,
                message: 'can not change password'
            });
            return;
        }

        // send email
        mailSender.send(email, "Reset password", `<a href= ${req.headers.host}/users/changePass/?user=${token}>click the link to change password</a>`);
        res.send({head: true, message: "we have sent you an email to change your password"});

    } catch(err){
        console.log(err);
        res.send({
            head: false,
            message: "can't find your email"
        });
    }
});

router.get("/changePass", async function(req,res, next){
    try{
        var token = await tokenHelper.decode(req.query.user);
        //packaging data
        res.cookie("tk", encoder.encode(JSON.stringify({data: token.data, token: req.query.user})), {signed: true});
        res.render("changePass");

    } catch(err){
        console.log(err);
        res.render("Message",{head: false, title: "Reset password",  message: "your link expired"});
    }
});

router.post("/changePass",async function(req, res, next){
    var cookies = req.signedCookies.tk; //get cookies 

    var jsonData = JSON.parse(encoder.decode(cookies));
    var password = req.body.password;
    console.log(jsonData);
    try{
       var token = jsonData.token;
       var data = JSON.parse(jsonData.data);
       //check token with token from data base
       var query = `select * from PendingToken where userId = '${data.ID}' and token = '${token}'`;
       var result = await helper.excuteQuerry(query);
       if(result.recordset.length!=1){
           res.send({head: false, message: "you can't change your password"});
           return;
       }
       
       //delete token from data base
       var deleteQuery = `delete from PendingToken where id = ${result.recordset[0].id}`;
       var deleteResult= await helper.excuteQuerry(deleteQuery);
       if(deleteResult.rowsAffected[0]==0){
           res.send({head: false, message: "can't change your password"});
           return;
       }
       
       //up date password
       var updateQuery = `update Account set password = '${md5(password)}' where id = '${data.ID}'`;
       var updateResult = await helper.excuteQuerry(updateQuery);
       if(updateResult.rowsAffected[0] == 0){
           res.send({head: false, message: "can't change your password"});
           return;
       }

       res.clearCookie("tk");
       res.send({head: true, message: "change password sucessfully"});

    } catch(err){
        console.log(err);
        res.send({head: false, message: "can't change your password"});
    }
});



module.exports = router;

