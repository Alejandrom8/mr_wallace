const Database = require("../infraestructure/Database.js");
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

async function authUser(userData){
    //The procedure response
    let message = '', status = false;
    //calling validateData to know
    const validation = validateData(userData);

    if(validation.status){
        const requestedPass = await getUserPass(userData.nickname);
        const passValidation = await validatePassword(userData.password, requestedPass);

        if(passValidation){
            message = "Autenticación correcta";
            status = true;
        }else{
            message = "Contraseña incorrecta";
        }
    }else{ 
        message = validation.message;
    }

    return {
        "message": message,
        "status": status
    };
}

function validateData(userData){
    let message = '', status = false;

    if(typeof userData === 'object'){
        if(userData.nickname && userData.password){
            status = true;
        }else{
            message = "Falto llenar el campo de ";
            message += userData.nickname ? "contraseña" : "nickname";
        }
    }else{
        message = `El tipo de dato es invalido: ${ typeof userData }`;
    }

    return {
        "message": message,
        "status": status
    };
}

async function getUserPass(nickname){
    let database = new Database();

    try{
        database.connect();
    
        let sql = 'SELECT password FROM ?? WHERE nick_name = ? LIMIT 1';
        let data = ['players', nickname];
        sql = mysql.format(sql, data);
    
        const password = await database.query(sql);

        database.end();

        return password;

    }catch(error){
        throw new Error(error);
    }
}

async function validatePassword(passwordEntered, truePassword){
    const validation = await bcrypt.compare(passwordEntered, truePassword);
    return validation;
}

console.log(authUser({"nickname": "alex", "password": "Alejandrom8"}));