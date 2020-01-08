const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

router.post('/', [

    check('name')
        .isLength({min:5, max: 100})
        .trim()
        .escape()
        .withMessage('El nombre debe tener más de 5 caracteres y menos de 100'),
    check('nickname')
        .isLength({min:3, max: 100})
        .trim()
        .escape(),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('La extructura del email es invalida'),
    check('password')
        .isLength({min: 5, max: 100})
    
], async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json({
            success: false,
            message: errors.array()
        });
    }

    const userData = req.body;

    const user_model = new User({
        name: userData.name,
        nickname: userData.nickname,
        email: userData.email,
        password: userData.password
    });

    const signUpResult = await user_model.signup();

    res.json(signUpResult);
});
 
module.exports = router;