var fs = require('fs');

function getDatadir(){
    var dir =  __dirname.replace("middleware", "data\\login.json");
    return dir;
}

module.exports.readData  =  function (req, res, next){
    fs.readFile(getDatadir(), {encoding: 'utf-8'}, function(err, data){
        if(err)
            res.send('error when read file');
        else{
            console.log(data);
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