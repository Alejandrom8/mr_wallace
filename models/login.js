const config = require("../infraestructure/config.js");
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const util = require('util');

async function authUser (userData){
    //The procedure response
    let message = '', status = false;
    //calling validateData to know
    const validation = validateData(userData);

    if(validation.status){
        const requestedPass = await getUserPass(userData.nickname).catch(e => { throw new Error(e); });
        if(requestedPass != ''){
            const passValidation = await validatePassword(userData.password, requestedPass).catch(e => { throw new Error(e); });

            if(passValidation){
                message = "Autenticación correcta";
                status = true;
            }else{
                message = "Contraseña incorrecta";
            }
        }else{
            message = 'Usuario incorrecto';
        }
    }else{ 
        message = validation.message;
    }

    return {
        "message": message,
        "status": status,
        "data": status ? validation.data : null
    };
}

function validateData (userData){
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
        "status": status,
        "data":{
            "nickname": userData.nickname,
            "email": userData.email
        }
    };
}

async function getUserPass (nickname){

    const database = mysql.createConnection(config);
    const query = util.promisify(database.query).bind(database);

    try{
        let sql = 'SELECT password FROM ?? WHERE nick_name = ? LIMIT 1';
        let data = ['players', nickname];
        sql = mysql.format(sql, data);

        const dataRecived = await query(sql);

        database.end();

        if(!dataRecived){ 
            throw "No se encontraron datos para esta petición"; 
        }else if(dataRecived == null || dataRecived.length == 0){
            return ''
        }
        
        return dataRecived[0].password;
    }catch(err){
        console.log(err);
    }
}

async function validatePassword (passwordEntered, truePassword){
    const validation = await new Promise( (resolve, reject) => {
        bcrypt.compare(passwordEntered, truePassword, (err, res) => {
            if(err){ reject(err); }
            resolve(res);
        });
    });
    return validation;
}

module.exports = authUser;