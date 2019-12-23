var express = require('express');
var router = express.Router();

const User = require('../models/User');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

exports.get = router;

router.post('/', async function(req, res, next) {
    const userData = req.body;

    const user_model = new User({
        password: userData.password,
        nickname: userData.nickname
    });

    const auth = await user_model.login();

    if(auth.status){
        ssn = req.session;
        ssn.nickname = userData.nickname;
        res.redirect('/home');
    }else{
        res.send(`Error en el logeo: ${auth.message}`);
    }
});
  
exports.post = router;