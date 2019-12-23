const config = require('../infraestructure/config');
const mysql = require('mysql');
const util = require('util');

class Model{
    constructor(){
        this.database = mysql.createConnection(config);
        this.query = util.promisify(this.database.query).bind(this.database);
    }
}

module.exports = Model;