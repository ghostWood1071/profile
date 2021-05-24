var express = require('express');
var route = express.Router();
var dbHelper = require('../helper/DBHelper');
var md5 = require('md5');
var fs  = require('fs');
var User = require('../model/user.model');

var helper = new dbHelper(process.env.DB_SERVER, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);

route.get('/',function(req, res,next){
    res.clearCookie("pubPath");
    res.clearCookie("uid");
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
                head: "error",
                content: "account or email already exists"
            });
            return;
        }
        await createAccount(newAccount, res);
    } catch(querryErr){
        res.send({
            head: "error",
            content: "account or email already exists"
        });
        return;
    }
});



async function createAccount(newAccount, res){
    var newUser = new User(newAccount.first_name, newAccount.last_name);
    try{
        var insertQuery =  `insert into 
                            Account(id, account, email, password) 
                            values('${newAccount.ID}', 
                                    '${newAccount.account}', 
                                    '${newAccount.email}', 
                                    '${newAccount.password}')`;

        var createReq =  await helper.excuteQuerry(insertQuery);
        if(createReq.rowsAffected[0] == 0){
            res.send({ 
                head: "data base err",
                message: "create account failed!"
            });
            return;
        }

        fs.mkdirSync(process.cwd()+"/data/"+newAccount.ID);
        fs.writeFileSync(process.cwd()+"/data/"+newAccount.ID+"/data.json", JSON.stringify(newUser), {encoding:"utf-8"});
        fs.mkdirSync(process.cwd()+"/public/user_public/"+newAccount.account);
        
        res.redirect("/login");

    } catch(createFileErr){
        console.log(createFileErr);
        res.send({ 
            head: "create file err",
            message: "create account failed!"
        });
        return;
    }
}


module.exports = route;
