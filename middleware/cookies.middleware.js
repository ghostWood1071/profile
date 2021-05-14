module.exports.saveLoginCookie = function(req, res, next){
    var dataPath = res.locals.path;
    res.cookie("data",dataPath,{
        signed: true
    });
    res.redirect("/users");
}

module.exports.clearCookie = function(req,res, next){
    res.clearCookie('data');
    next();
}