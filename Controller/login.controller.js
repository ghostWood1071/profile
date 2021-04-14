module.exports.getLoginPage  = function(req, res, next){
    res.render('login');
}

module.exports.getLoginInfo = function(req,res,next){
    var account = req.body.account;
    var pass = req.body.password;
    res.locals.login = {
        account: account, 
        pass: pass
    };
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
        }
        else
            res.send("fail");
    }
    else
        res.send("fail");
}