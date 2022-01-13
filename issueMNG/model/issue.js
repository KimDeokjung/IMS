// ===================================================
// * 이슈 데이터 베이스 구조 *
// Id : 기본 식별자(오브젝트 아이디로 몽고 디비가 자동으로 생성)
// ProjectId : 이슈가 저장된 프로젝트 아이디
// Designated : 해당 이슈 담당자
// Title : 이슈 이름
// Text : 이슈 내용
// Progress : 이슈 진행도
// User : 이슈 생성자
// Created : 이슈 생성일
// Deadline : 이슈 마감일
// ===================================================

var mongoose = require('mongoose');

var IssueSchema = new mongoose.Schema({
    Id: String,
    ProjectId : {type: String, default: ""},
    Designated : {type: String, default: ""},
    Title : {type: String, default: ""},
    Text : {type: String, default: ""},
    Progress : {type: Number, default: 0},
    User : {type: String, default: ""},
    Created : {type: Date, default: Date.now},
    Deadline : {type: Date, default: Date.now},
}, {
    versionKey: false
});

module.exports = mongoose.model('issue', IssueSchema);
