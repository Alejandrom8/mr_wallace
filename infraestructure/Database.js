const mysql = require('mysql');

class Database{
    constructor(){
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "mr_wallace",
            charset: "utf8"
        });

        this._con = connection;
    }

    get conection(){
        return this._con;
    }

    connect(){
        this._con.connect();
    }

    end(){
        this._con.end();
    }
}

module.exports = Database;