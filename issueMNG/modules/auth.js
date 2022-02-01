//로그인 및 회원가입 모듈 작업 공간
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('express-async-errors');
const userRepository = require('../model/user');
const { jwtInfo, bcryptInfo } = require('../config/config')

module.exports.signup = async function (req,res,callback){
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findOne({username:username});

    if (found) {
        return res.status(409).json({ message: `${username} already exists` });
    }

    // console.log(typeof password, typeof bcryptInfo.bcryptSaltRounds)
    const hashed = await bcrypt.hash(password, Number(bcryptInfo.bcryptSaltRounds));

    const user = await userRepository.insertMany({
        username,
        password: hashed,
        name,
        email
    });

    const token = createJwtToken(user[0]._id);
    res.cookie('user',name);
    res.cookie('ims',token);
    res.status(201).json({ name });
}

module.exports.login = async function (req,res,callback){
    const { username, password } = req.body;
    const user = await userRepository.findOne({username:username});
    if (!user) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }
    const token = createJwtToken(user._id);
    res.cookie('user',user.name);
    res.cookie('ims',token);
    res.status(200).json({ name:user.name });
}

module.exports.me = async function (req,res,callback){
    const user = await userRepository.findOne({_id:req.userId});
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(_id) {
    return jwt.sign({ _id }, jwtInfo.jwtSecretKey, { expiresIn: jwtInfo.jwtExpiresInDays });
}
