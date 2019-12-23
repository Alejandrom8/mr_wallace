const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
    res.render('signup', {title: 'sign up'});
});

exports.get = router;

router.post('/', [
    check('name').isLength({min:2, max: 100}).trim().escape(),
    check('nickname').isLength({min:2, max: 100}).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({min: 5, max: 100})
], async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
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
 
exports.post = router;