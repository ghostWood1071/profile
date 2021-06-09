var sql = require("mssql");

class DBHelper{
    constructor(server, user, password, dbName){
        this.pool = new sql.ConnectionPool({
            server: server,
            user: user,
            password: password,
            database: dbName,
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        });
    }

    connect = async function(){
        if(!this.pool.connected)
            try{
               await this.pool.connect();
               return true;
            } catch(err){
                console.log(err);
                return false;
            }
        return true;
    }

    close = async function(){
        if(this.pool.connected)
            try{
                await this.pool.close();
                return true;
            } catch(err){
                console.log(err);
                return err;
            }
        return true;
    }

    excuteQuerry = async function(command){
        if(! await this.connect())
            return;
        try{
           var data =   await this.pool.query(command);
           return data;
        } catch(err){
            return err;
        }
    }
}

module.exports = DBHelper;