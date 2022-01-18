var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const project = require('../modules/issue');

// Get issue Page.
router.get('/', function(req, res, next) {
    res.render('issueCRUD_test', { title: 'Express' });
});

module.exports = router;
