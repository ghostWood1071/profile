var fs = require("fs");

module.exports.getUserInfo = function (req, res, next) {
    var dataPath = req.signedCookies.data;
    var user  = JSON.parse(fs.readFileSync(process.cwd()+"\\data\\"+dataPath+"\\data.json", {encoding: "utf-8"}));
    res.render(user.template.name, {
        template: user.template,
        avatar: user.avatar,
        about: user.about,
        research_interest: user.research_interests,
        academic: user.academic,
        teaching: user.teaching,
        thesis: user.thesis,
        research_grant: user.research_grant,
        public: user.publications,
        path: "/user_public/"+dataPath+"/",
        news: user.news
    });
}

module.exports.saveData = function(req, res, next){
    var newUser = JSON.parse(req.body.content);
    var dataPath = process.cwd()+"\\data\\"+req.signedCookies.data+"\\data.json"
    var oldUser  = JSON.parse(fs.readFileSync(dataPath, {encoding: "utf-8"}));
    
    oldUser.template = newUser.template;
    oldUser.avatar = newUser.avatar;
    oldUser.about  = newUser.about;
    oldUser.research_interests = newUser.research_interests;
    oldUser.academic = newUser.academic;
    oldUser.teaching = newUser.teaching;
    oldUser.thesis = newUser.thesis;
    oldUser.research_grant = newUser.research_grant;
    oldUser.publications = newUser.publications;
    oldUser.news = newUser.news;

    try {
        fs.writeFileSync(dataPath, JSON.stringify(oldUser));
        res.send("save sucess");
    } catch (error) {
        res.send(error);
    }
  
}










