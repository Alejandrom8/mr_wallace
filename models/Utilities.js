const Model = require('./model');
const mysql = require('mysql');
const QueryError = require('../errorHandlers/QueryError');

/**
*   Class that represents a set of tools which will help to the develop of the user
*   interface.
*/
class Utilities extends Model{

    constructor(){
        super();
    }

    /**
     * This function search the given col-name for say if the column exists or not.
     * @param {string} colName - the name of the column that will be searched.
     * @returns {boolean} - true if the column is finded.
     */
    async checkIfColExists(colName){
        try{
            let sql = 'SHOW COLUMNS FROM ?? LIKE ?';
            const data = ['players', colName];
            sql = mysql.format(sql, data);

            const results = await this.query(sql);

            if(results.length > 0){
                return true;
            }

            return false;
        }catch(e){
            console.log(e);
        }
    }

    /**
     * This function search if an item alredy exists in the database.
     * @param {string} element - the name of the column where the value should be finded.
     * @param {string || int} value - the value that will be searched.
     * @returns {boolean}
     */
    async searchCoincidencesFor(element, value){
        try{
            if(await this.checkIfColExists(element)){
                //the colname should stay concatenated like string concatenation, otherwise it will crack.
                let sql = 'SELECT name FROM ?? WHERE ' + element + ' = ? LIMIT 1';
                const data = ['players', value];
                sql = mysql.format(sql, data);
  
                const results = await this.query(sql);
                
                if(results.length > 0){
                    return true;
                }

                return false;
            }else{
                throw new QueryError('La columna que intentas consultar, no existe');
            }
        }catch(e){
            console.log(e.res);
        }
    }
}

module.exports = Utilities;