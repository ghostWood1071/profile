

module.exports.getUserInfo = function (req, res, next) {
    var data = JSON.parse(res.locals.stringData);
    var uid = req.signedCookies.userID;
    var user = data[uid];
    res.render(user.template.name, {
        template: user.template,
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

module.exports.saveData = function(req, res, next){
    var newUser = JSON.parse(req.body.content);
    var data = JSON.parse(res.locals.stringData);
    var userID  = req.signedCookies.userID;
    var oldUser = data[userID];
    
    oldUser.template = newUser.template;
    oldUser.avatar = newUser.avatar;
    oldUser.about  = newUser.about;
    oldUser.research_interests = newUser.research_interests;
    oldUser.academic = newUser.academic;
    oldUser.teaching = newUser.teaching;
    oldUser.thesis = newUser.thesis;
    oldUser.research_grant = newUser.research_grant;
    oldUser.publications = newUser.publications;

    data[userID] = oldUser;
    res.locals.jsonObj = data;
    next();
}

module.exports.saveSuccess = function(req,res,next){
    res.send('save data sucess');
}








