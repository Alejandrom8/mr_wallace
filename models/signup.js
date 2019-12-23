const Model = require('./model');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

class Signup extends Model{
    constructor(name, nickname, email, password){
        super();
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    async encryptPassword(password){
        const pass = this.password;
        const encrypted = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt){
                if(err) { reject(err); }
                bcrypt.hash(pass, salt, function(err, hash){
                    if(err){ reject(err); }
                    resolve(hash); 
                });
            });
        });
        this.password = encrypted;
    }
    
    async insert(){
        let response = {
            'message': '',
            'status': false
        };

        try{

            await this.encryptPassword();

            let sql = 'INSERT INTO players(id, name, password, nick_name, email) VALUES(0, ?, ?, ?, ?)';
            const valuesToInsert = [
                this.name,
                this.password,
                this.nickname,
                this.email
            ];
            sql = mysql.format(sql, valuesToInsert);

            const queryData = await this.query(sql);

            if(queryData.length == 0){
                response.message = 'Error al insertar al usuario en la base de datos';
            }else{
                response.message = `Se han insertado ${queryData.length} filas`;
                response.status = true;
            }

            this.database.end();

        }catch(e){
            response.message = e;
        }finally{
            return response;
        }
    }
}

module.exports = Signup;