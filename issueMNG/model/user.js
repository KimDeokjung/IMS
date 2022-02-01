// ===================================================
// * 사용자 데이터 베이스 구조 *
// UserName : 사용자 아이디
// Password : 사용자 패스워드
// Created : 가입 날짜
// ===================================================

var mongoose = require('mongoose');

var User = new mongoose.Schema({
    username : {type: String},
    password : {type: String},
    email : {type: String},
    name : {type: String},
    Created : {type: Date, default: Date.now}
}, {
    versionKey: false
});

module.exports = mongoose.model('users', User);
