var express = require('express');
var router = express.Router();
const project = require('../modules/project');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainCRUD_test', { title: 'Express' });
});

/* Get Issue Page. */


/* Get Review Page. */



module.exports = router;
