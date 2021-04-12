const { json } = require('express');
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
    fs.writeFile('', data, function(err){
        if(err)
            res.send('error when write file');
        else
            next();
    });
}

module.exports.getUserInfo = function (req, res, next) {
    var data = JSON.parse(res.locals.stringData);
    var user = data[0];
    res.render('index', {
        avatar: user.avatar,
        about: user.about,
        research_interst: user.research_interests,
        academic: user.academic,
        teaching: user.teaching,
        thesis: user.thesis,
        research_grant: user.research_grant,
        public: user.publications
    });
}





