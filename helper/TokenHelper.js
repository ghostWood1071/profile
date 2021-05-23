var jwt = require('jsonwebtoken');
class TokenHelper{
    constructor(signature){
        this.signature = signature;
    }

    encode(data, life){
        return new Promise(function(resolve, reject){
            jwt.sign(
                {data: data},
                this.signature,
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
            jwt.verify(token, this.signature, function(err, decoded){
                if(err)
                    reject(err);
                else
                    resolve(decoded);
            });
        });
    }
}

module.exports = TokenHelper;