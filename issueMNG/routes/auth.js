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
        .withMessage('아이디를 입력해주세요.'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('비밀번호는 최소 5 글자는 되어야 합니다.'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('이름을 입력해주세요.'),
    body('email').isEmail().normalizeEmail().withMessage('잘못된 형식의 이메일입니다.'),
    // body('url')
    //     .isURL()
    //     .withMessage('invalid URL')
    //     .optional({ nullable: true, checkFalsy: true }),
    validate,
];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

module.exports = router;
