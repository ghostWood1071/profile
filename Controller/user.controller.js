var fs = require('fs');

function getDatadir(){
    var dir =  __dirname.replace("Controller", "data\\data.json");
    return dir;
}

module.exports.readData  =  function (req, res, next){
    fs.readFile(getDatadir(), {encoding: 'utf-8'}, function(err, data){
        if(err)
            res.send('error when read file');
        else{
            res.locals.stringData = data;
            next();
        }
    });
}

module.exports.writeData =  function(req, res, next){
    var obj = res.locals.jsonObj;
    var data = JSON.stringify(obj);
    fs.writeFile(getDatadir(), data, function(err){
        if(err)
            res.send('error when write file');
        else
            next();
    });
}


module.exports.auth = function(req, res, next){
    if(req.signedCookies.userID){
        next();
        return;
    } else
        res.redirect("/users/login");
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
    }
    res.send("fail");
}

module.exports.saveLoginCookie = function(req, res, next){
    var uid = res.locals.uid;
    res.cookie("userID",uid,{
        signed: true
    });
    res.redirect("/users");
}

module.exports.getUserInfo = function (req, res, next) {
    var data = JSON.parse(res.locals.stringData);
    var uid = req.signedCookies.userID;
    var user = data[uid];
    
    res.render(user.template, {
        avatar: user.avatar,
        about: user.about,
        research_interest: user.research_interests,
        academic: user.academic,
        teaching: user.teaching,
        thesis: user.thesis,
        research_grant: user.research_grant,
        public: user.publications
    });
}





