const Model = require('./model');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const ServiceResponse = require('../entities/Response');
// const ClientSideException = require('../entities/ClientSideException');


class User extends Model {

    constructor({name = '', password, nickname, email = ''} = {}){
        super();
        this._name = name;
        this._password = password;
        this._nickname = nickname;
        this._email = email;
    }

    get name(){
        return this._name;
    }

    /** @param {string} name - name */
    set name(name){
        this._name = name;
    }

    /**
     * @returns {string}
     */
    get password(){
        return this._password;
    }

    set password(password){
        this._password = password;
    }

    get nickname(){
        return this._nickname;
    }

    set nickname(nickname){
        this._nickname = nickname;
    }

    get email(){
        return this._email;
    }

    set email(email){
        this._email = email;
    }

    get dataAsObject(){
        return {
            'name': this._name,
            'password': this._password,
            'nickname': this._nickname,
            'email': this._email
        };
    }

    /**
     * Log a user with the data given at the time of creating the object.
     * strictly, this method use the nickname and the password of the user.
     * @returns { ServiceResponse } - an object with the status of this process.
     */
    async login(){
        //The procedure response
        let response = new ServiceResponse();
        //calling validateData to know
        const validation = this.validateData(this.dataAsObject);

        if(validation.success){
            const requestedPass = await this.getUserPass(validation.data.nickname).catch(e => { throw new Error(e); });
            if(requestedPass != ''){
                const passValidation = await this.validatePassword(validation.data.password, requestedPass).catch(e => { throw e; });

                if(passValidation){
                    response.message = "Autenticación correcta";
                    delete validation.data.password;
                    response.data = validation.data;
                    response.success = true;
                }else{
                    response.message = "Contraseña incorrecta";
                }
            }else{
                response.message = 'Usuario incorrecto';
            }
        }else{ 
            response.message = validation.message;
        }

        return response;
    }

    /**
     * 
     * @param { object } userData 
     */
    validateData (userData){
        let message = '', success = false;
    
        if(typeof userData === 'object'){
            if(userData.nickname && userData.password){
                success = true;
            }else{
                message = "Falto llenar el campo de ";
                message += userData.nickname ? "contraseña" : "nickname";
            }
        }else{
            message = `El tipo de dato es invalido: ${ typeof userData }`;
        }
    
        return {
            "message": message,
            "success": success,
            "data":{
                "nickname": userData.nickname,
                "password": userData.password
            }
        };
    }
    
    /**
     * 
     * @param { string } [nickname]
     */
    async getUserPass (nickname = null){

        nickname = nickname ? nickname : this.nickname;

        try{
            let sql = 'SELECT password FROM ?? WHERE nick_name = ? LIMIT 1';
            let data = ['players', nickname];
            sql = mysql.format(sql, data);
    
            const dataRecived = await this.query(sql);

            if(!dataRecived){ 
                throw "No se encontraron datos para esta petición"; 
            }else if(dataRecived == null || dataRecived.length == 0){
                return null;
            }
            
            return dataRecived[0].password;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    
    async validatePassword (passwordEntered, truePassword){
        const validation = await new Promise( (resolve, reject) => {
            bcrypt.compare(passwordEntered, truePassword, (err, res) => {
                if(err){ reject(err); }
                resolve(res);
            });
        });
        return validation;
    }

    async signup(){
        let response = ServiceResponse();

        try{
            const results = await this.searchExistingUserData({
                nickname: this.nickname,
                email: this.email
            });

            const exists = results[0], elementThatExists = results[1];

            if(!exists){

                this.password = await this.encryptPassword(this.password);

                let sql = 'INSERT INTO players(id, name, password, nick_name, email) VALUES(0, ?, ?, ?, ?)';
                const valuesToInsert = [
                    this.name,
                    this.password,
                    this.nickname,
                    this.email
                ];
                sql = mysql.format(sql, valuesToInsert);

                const queryData = await this.query(sql);

                this.database.end();

                if(queryData.length == 0){
                    response.message = 'Error al insertar al usuario en la base de datos';
                }else{
                    response.message = `Se han insertado ${queryData.affectedRows} filas`;
                    response.success = true;
                }

            }else{
                // throw new ClientSideException(`Ya existe un usuario con este ${elementThatExists}`);
                response.message = `Ya existe un usuario con este ${elementThatExists}`;
            }
        }catch(e){
            response.message = e;
        }finally{
            console.log(response);
            return response;
        }
    }

    async searchExistingUserData({nickname, email} = {}){

        const { 
            message: nicknameCoincidencesMessage,
            success: nicknameCoincidencessuccess, 
            data: nicknameCoincidencesData
        } = await this.searchUserConicidences(nickname);

        if(!nicknameCoincidencessuccess){ 
            console.log(nicknameCoincidencesMessage); //throw a new ClientSide Exception ? 
        }

        if(nicknameCoincidencesData > 0){
            return [true, 'nickname'];
        }

        const { 
            message: emailCoincidencesMessage,
            success: emailCoincidencessuccess, 
            data: emailCoincidencesData
        } = await this.searchUserConicidences(email);

        if(!emailCoincidencessuccess){ 
            console.log(emailCoincidencesMessage); //throw a new ClientSide Exception ? 
        }

        if(emailCoincidencesData > 0){
            return [true, 'email'];
        }

        return [false, ''];
    }

    async searchUserConicidences(searchedElement){
        let response = {
            message: '',
            success: false,
            data: null
        };
        
        try{
            let sql = 'SELECT * FROM ?? WHERE name = ? OR nick_name = ? OR email = ?';
            // const valuesToInsert = Array(3).fill(searchedElement).unshift('players');
            const valuesToInsert = ['players', searchedElement, searchedElement, searchedElement];
            sql = mysql.format(sql, valuesToInsert);

            const results = await this.query(sql);
            response.data = results.length;
            response.success = true;
        }catch(e){
            response.message = e;
        }finally{
            return response;
        }
    }

    /**
     * 
     * @param {string} password - the desencrypted password of the user.
     * @returns {string} - the encrypted password.
     */
    async encryptPassword(password){
        const encrypted = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt){
                if(err) { reject(err); }
                bcrypt.hash(password, salt, function(err, hash){
                    if(err){ reject(err); }
                    resolve(hash); 
                });
            });
        });
        return encrypted;
    }

    // async update(){

    // }

    // async delete(){

    // }
}

module.exports = User;