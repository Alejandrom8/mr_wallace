const ErrorHandler = require('./ErrorHandler');

class QueryError extends ErrorHandler{
    constructor(message){
        super(message, 'Error al realizar una consulta a la BD');
    }
}

module.exports = QueryError;