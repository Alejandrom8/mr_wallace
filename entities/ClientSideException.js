const express = require('express');
const router = express.Router();

class ClientSideException{
    constructor(message){
        console.log(message);
    }
} 

module.exports = ClientSideException;