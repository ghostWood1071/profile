module.exports.saveLoginCookie = function(req, res, next){
    var uid = res.locals.uid;
    res.cookie("userID",uid,{
        signed: true
    });
    res.redirect("/users");
}

module.exports.clearCookie = function(req,res, next){
    res.clearCookie('dt');
    next();
}