var User = require('../model/user.model');
var fs = require('fs');
module.exports.createPublic = function(newAccount){
    return new Promise(function(resolve, reject){
        fs.mkdir(process.cwd()+"/public/user_public/"+newAccount.account+"/", {recursive:true}, function(err){
            if(err){
                reject(err);
            } else{
                resolve(true);
            }
        });
    }); 
}

module.exports.createPrivateDirectory = function(newAccount){
    return new Promise(function(resolve, reject){
        var newUser = new User(newAccount.first_name, newAccount.last_name);
        fs.mkdir(process.cwd()+"/data/"+newAccount.ID+"/",{recursive: true} ,function(err){
            if(err){
                reject(err);
            } else{
                fs.writeFile(process.cwd()+"/data/"+newAccount.ID+"/data.json",JSON.stringify(newUser), {encoding:"utf-8"}, function(err){
                    if(err){
                        reject(err);
                    } else{
                        resolve(true);
                    }
                });
            }
        });
    });
}