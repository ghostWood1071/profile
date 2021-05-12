var fs = require('fs');


module.exports.readData = function(path){
   return  fs.readFileSync(path, {encoding: "utf-8"});
}

