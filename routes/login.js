var express = require('express');
var router = express.Router();
var UUID = require('uuid');

const User = require('../models/User');

router.post('/', async function(req, res, next) {
    const userData = req.body;

    const user_model = new User({
        password: userData.password,
        nickname: userData.nickname
    });

    const auth = await user_model.login();

    if(auth.success){
        ssn = req.session;
        ssn.playerData = {
            nickname: auth.data.nickname
        }
    }

    res.json(auth);
});

module.exports = router;