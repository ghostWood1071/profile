var express = require('express');
var router = express.Router();
var dbHelper = require("../helper/DBHelper");
var md5 = require('md5');
var helper = new dbHelper('ADMIN', 'sa', '111', 'profiledb');

router.get("/", function(req, res, next){
        if(req.signedCookies.uid == undefined){
                res.render("login");
                return;
        }
        res.redirect("/users");
});

router.post("/", async function(req,res,next){
        var account = req.body.account;
        var pass = req.body.password;
        var querry = `select * 
                      from Account 
                      where (account = '${account}' and password = '${md5(pass)}') or
                            (email = '${account}' and password = '${md5(pass)}')`;

        try{
                var data = await helper.excuteQuerry(querry);
                if(data == undefined){
                        console.log("can't connect to the database");
                        res.send("error");
                        return;
                }
                console.log(data);
                var set = data.recordset;
                if(set.length == 0){
                        res.send({ 
                                head: "error",
                                message: "account or login is wrong!"
                        });
                        return;
                }
                res.cookie("uid", set[0].id, {
                        signed: true
                });

                res.cookie("pubPath", set[0].account, {
                        signed: true
                });

                res.redirect("/users");  

        } catch(queryErr){
             console.log(queryErr);
             res.send({ 
                        head: "error",
                        message: "account or login is wrong!"
                });
             return;
        }
});

module.exports = router;