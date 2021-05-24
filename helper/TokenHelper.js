var jwt = require('jsonwebtoken');
var dotenv = require('dotenv').config();
class TokenHelper{
    constructor(){
        
    }

    encode(data, life){
        return new Promise(function(resolve, reject){
            jwt.sign(
                {data: data},
                process.env.TOKE_SECRET,
                {
                    algorithm: "HS256",
                    expiresIn: life
                }, function(err, encoded){
                    if(err)
                        return reject(err);
                    resolve(encoded);
                }
            );
        });
    }

    decode(token){
        return new Promise(function(resolve, reject){
            jwt.verify(token, process.env.TOKE_SECRET, function(err, decoded){
                if(err)
                    reject(err);
                else
                    resolve(decoded);
            });
        });
    }
}

module.exports = TokenHelper;