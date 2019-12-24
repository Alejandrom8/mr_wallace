var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session;
  res.render('index', { title: 'Express', name: 'Jhon' });
});

module.exports = router;
