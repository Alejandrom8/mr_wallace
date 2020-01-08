class ErrorHandler extends Error{
    constructor(message, typeError){
        this.res = {
            success: false,
            message: message,
            typeError: typeError,
            clientMessage: ''
        }
    }
}

module.exports = ErrorHandler;