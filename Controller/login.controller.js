var fs = require('fs');

module.exports.auth = function(req, res, next){
    if(req.signedCookies.data){
        console.log("ok");
        next();
        return;
    } else
        res.redirect("/login");
}

module.exports.getLoginPage  = function(req, res, next){
    if(req.signedCookies.userID){
        res.redirect("/users");
        return;
    }
    res.render('login');
}

module.exports.getLoginInfo = function(req,res,next){
    var account = req.body.account;
    var pass = req.body.password;
    res.locals.login = {
        account: account, 
        password: pass
    };
    next();
}

module.exports.validate = function(req,res,next) {
    var loginInfo = res.locals.login;
    var loginData = JSON.parse(res.locals.stringData);
    var user = loginData.find(x=>x.account === loginInfo.account);
    if(user != undefined){
        if(user.password === loginInfo.password){
           res.locals.path = user.data_path;
           next();
           return;
        }
        res.send({
            head: "login fail",
            err: "bad password"
        });
        return;
    }
    res.send({
        head: "login fail",
        err: "account not found"
    });
}
