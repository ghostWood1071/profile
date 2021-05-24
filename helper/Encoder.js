var crypto = require('crypto-js');

class Encoder{
    constructor(secretkey){
        this.secret= secretkey;
    }

    encode(data){
       return crypto.AES.encrypt(data, this.secret).toString();
    }

    decode(data){
        return crypto.AES.decrypt(data, this.secret).toString(crypto.enc.Utf8);
    }
}

module.exports = Encoder;