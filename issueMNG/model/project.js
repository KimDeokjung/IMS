// ===================================================
// * 프로젝트 데이터 베이스 구조 *
// Id : 기본 식별자
// Title : 프로젝트 이름
// Explain : 프로젝트 설명
// Created : 프로젝트 생성일
// Category : 프로젝트 카테고리
// Host : 프로젝트 담당자
// Members : 프로젝트 참가자
// ===================================================

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    Id: String,
    Title : {type: String, default: ""},
    Explain : {type: String, default: ""},
    Created : {type: Date, default: Date.now},
    Category : {type: String, default: ""},
    Host : {type: String, default: ""},
    Members : {type: Array, default: []},
    Like : {type: Array, default: []},
}, {
    versionKey: false
});

module.exports = mongoose.model('project', ProjectSchema);
