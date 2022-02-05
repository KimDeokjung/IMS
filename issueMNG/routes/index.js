var express = require('express');
var router = express.Router();
const project = require('../modules/project');
const { isAuth } = require('../middleware/auth.js');


/* GET home page. */
router.get('/', isAuth, function(req, res, next) {
  res.render('main', { title: 'Express' });
});


/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signUp', { title: 'Express' });
});


/* GET home page. */
router.get('/signin', function(req, res, next) {
  res.render('signIn', { title: 'Express' });
});

module.exports = router;
