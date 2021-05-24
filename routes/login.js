var express = require('express');
var router = express.Router();
var dbHelper = require("../helper/DBHelper");
var md5 = require('md5');
var dotenv = require('dotenv').config();
var crypto = require('crypto-js');
var Encoder = require('../helper/Encoder');

var helper = new dbHelper(process.env.DB_SERVER, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
var encoder = new Encoder(process.env.CRYPTO_SECRET);

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
                var set = data.recordset;
                if(set.length == 0){
                        res.send({ 
                                head: "error",
                                message: "account or login is wrong!"
                        });
                        return;
                }

                var uid = encoder.encode(set[0].id);
                res.cookie("uid", uid, {signed: true});

                res.cookie("pubPath", set[0].account, {signed: true});

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