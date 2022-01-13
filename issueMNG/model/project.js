// ===================================================
// * 프로젝트 데이터 베이스 구조 *
// Id : 기본 식별자
// Title : 프로젝트 이름
// Explain : 프로젝트 설명
// User : 프로젝트 생성자
// Created : 프로젝트 생성일
// ===================================================

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    Id: String,
    Title : {type: String, default: ""},
    Explain : {type: String, default: ""},
    User : {type: String, default: ""},
    Created : {type: Date, default: Date.now},
}, {
    versionKey: false
});

module.exports = mongoose.model('project', ProjectSchema);
