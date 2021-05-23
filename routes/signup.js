var express = require('express');
var route = express.Router();
var dbHelper = require('../helper/DBHelper');
var md5 = require('md5');
var fs  = require('fs');

var helper = new dbHelper('ADMIN', 'sa', '111', 'profiledb');

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
        var result =  await helper.excuteQuerry(`select account 
                                             from Account 
                                             where account = '${newAccount.account}' or 
                                                   email = '${newAccount.email}'`
                                            );
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
    var newUser = {
        "template": {
          "name": "template1",
          "color": "#c74a73",
          "background_color": "linear-gradient(to top, rgb(11, 163, 96) 0%, rgb(60, 186, 146) 100%)"
        },
        "avatar": "",
        "about": {
          "name": newAccount.first_name+" "+newAccount.last_name,
          "level": "Ph.D",
          "university": [],
          "address": "",
          "phone": "",
          "fax": "",
          "mail": [] 
        },
        "research_interests": [],
        "academic": [],
        "news": [],
        "teaching": {
          "academic_year": "",
          "graduate_course": [],
          "undergraduate_courses": []
        },
        "thesis": {
          "link": [],
          "content": []
        },
        "research_grant":  [],
        "publications": {
          "book": [],
          "paper": []
        }
    
    }
    try{
        var createReq =  await helper.excuteQuerry(`insert into 
                                                    Account(id, account, email, password) 
                                                    values('${newAccount.ID}', 
                                                            '${newAccount.account}', 
                                                            '${newAccount.email}', 
                                                            '${newAccount.password}')`);
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
