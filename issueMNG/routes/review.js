var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const project = require('../modules/review');

// Get review Page.
router.get('/', function(req, res, next) {
    res.render('reviewCRUD_test', { title: 'Express' });
});

module.exports = router;
