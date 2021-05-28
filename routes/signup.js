var express = require('express');
var route = express.Router();
var dbHelper = require('../helper/DBHelper');
var md5 = require('md5');
var fs  = require('fs');
var User = require('../model/user.model');
var TokenHelper = require("../helper/TokenHelper");
var MailSender = require("../helper/MailSender");
const router = require('./users');
const { get } = require('http');

var helper = new dbHelper(process.env.DB_SERVER, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
var tokenHelper = new TokenHelper();
var mailSender = new MailSender();

route.get('/',function(req, res,next){
    res.clearCookie("pubPath");
    res.clearCookie("uid");
    res.clearCookie("message");
    res.clearCookie("tk");
    res.render("signup");
});

route.post('/', async function(req, res, next){
    var newAccount = {
        ID: Date.now().toString(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        account: req.body.account,
        password: md5(req.body.password),
        email: req.body.email
    }

    try{
        var accountQuerry = `select account 
                             from Account 
                             where account = '${newAccount.account}' or 
                             email = '${newAccount.email}'`;    
        var result =  await helper.excuteQuerry(accountQuerry);
        console.log(result);
        if(result.recordset.length>0){
            res.send({
                head: false,
                content: "account or email already exists"
            });
            return;
        }

        //insert new user to database
        var insertQuery =  `insert into 
                            Account(id, account, email, password) 
                            values('${newAccount.ID}', 
                                    '${newAccount.account}', 
                                    '${newAccount.email}', 
                                    '${newAccount.password}')`;
        var createReq =  await helper.excuteQuerry(insertQuery);
        if(createReq.rowsAffected[0] == 0){
            res.send({ 
                head: false,
                message: "create account failed!"
            });
            return;
        }
        
        var token = await tokenHelper.encode(JSON.stringify(newAccount), "30d");
        mailSender.send(newAccount.email, "Account Activate", `<a href = '${req.headers.host}/signup/account.activate/?newAccount=${token}'>click to activate your account</a>`);
        // res.cookie("message", "we have sent you a mail to activate account. You can can activate in 30 day");
        res.send({
            head: true,
            content: "signup sucess"
        });

    } catch(querryErr){
        console.log(querryErr);
        res.send({
            head: false,
            content: "account or email already exists"
        });
        return;
    }
});

route.get("/account.activate", async function(req, res, next){
    var token = req.query.newAccount;
    console.log(req.query);
    try{
        var tokenDecoded = await tokenHelper.decode(token);
        var newAccount = JSON.parse(tokenDecoded.data);
       
        //create folder and data file 
        var newUser = new User(newAccount.first_name, newAccount.last_name);
        fs.mkdir(process.cwd()+"/data/"+newAccount.ID+"/",{recursive: true} ,function(err){
            if(err){
                console.log(err);
                res.render("Message", {title: "Error", message: "your activate link expired"});
                return;
            }
            fs.writeFile(process.cwd()+"/data/"+newAccount.ID+"/data.json",JSON.stringify(newUser), {encoding:"utf-8"}, function(err){
                console.log(err);
                res.render("Message", {title: "Error", message: "your activate link expired"});
                return;
            });
        });
        
        //create public folder
        fs.mkdir(process.cwd()+"/public/user_public/"+newAccount.account+"/", {recursive:true}, function(err){
            if(err){
                console.log(err);
                res.render("Message", {title: "Error", message: "your activate link expired"});
                return;
            }
        });

        var updateQuerry = `update Account set active = 1 where id ='${newAccount.ID}'`;
        var updateResult =  await helper.excuteQuerry(updateQuerry);
        if(updateResult.rowsAffected[0] != 1){
            res.render("Message", {title: "Error", message: "your activate link expired"});
            return;
        }

        res.render("Message", {title: "Sucess", message: "Your account is activated\n <a href = '/login'>go to login</a>"});
    }catch(tokenErr){
        console.log(tokenErr);
        res.render("Message", {title: "Error", message: "your activate link expired"});
    }
});

route.get("/account", function(req, res, next){
    res.render("Message", {title: 'Sucesss', message: 'we have sent you a mail to activate account. You can activate in 30 day'});
})


module.exports = route;
