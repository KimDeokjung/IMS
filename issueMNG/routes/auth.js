var express = require('express');
require('express-async-errors');
const { body } = require('express-validator');
const { validate } =require('../middleware/validator.js');
const authController = require('../modules/auth.js');
const { isAuth } = require('../middleware/auth.js');

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password should be at least 5 characters'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
        .isURL()
        .withMessage('invalid URL')
        .optional({ nullable: true, checkFalsy: true }),
    validate,
];

// router.post('/signup', validateSignup, authController.signup);
//
// router.post('/login', validateCredential, authController.login);
//
// router.get('/me', isAuth, authController.me);

module.exports = router;
