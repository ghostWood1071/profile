module.exports.getUserInfo = function (req, res, next) {
    var data = JSON.parse(res.locals.stringData);
    var uid = req.signedCookies.userID;
    var user = data[uid];
    console.log(user);
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








