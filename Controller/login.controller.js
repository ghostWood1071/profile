module.exports.auth = function(req, res, next){
    if(req.signedCookies.userID){
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
        pass: pass
    };
    console.log(res.locals.login);
    next();
}

module.exports.validate = function(req,res,next) {
    var loginInfo = res.locals.login;
    var data =  JSON.parse(res.locals.stringData);
    var uid = data.findIndex(x=>x.login.account === loginInfo.account);
    if(uid>=0){
        var user = data[uid];
        if(user.login.pass === loginInfo.pass){
           res.locals.uid = uid;
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
