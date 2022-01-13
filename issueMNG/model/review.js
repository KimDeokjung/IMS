// ===================================================
// * 리뷰 데이터 베이스 구조 *
// Id : 기본 식별자
// ProjectId : 리뷰가 저장된 프로젝트 아이디
// Text : 리뷰 내용
// User : 리뷰 생성자
// Created : 리뷰 생성일
// ===================================================

var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    Id: String,
    ProjectId : {type: String, default: ""},
    Text : {type: String, default: ""},
    User : {type: String, default: ""},
    Created : {type: Date, default: Date.now},
}, {
    versionKey: false
});

module.exports = mongoose.model('review', ReviewSchema);
