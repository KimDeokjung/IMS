// ===================================================
// * 이슈 데이터 베이스 구조 *
// Id : 기본 식별자(오브젝트 아이디로 몽고 디비가 자동으로 생성)
// ProjectId : 이슈가 저장된 프로젝트 아이디
// Text : 이슈 내용
// Progress : 이슈 진행도
// Deadline : 이슈 마감일
// ===================================================

var mongoose = require('mongoose');

var IssueSchema = new mongoose.Schema({
    Id: String,
    ProjectId : {type: String, default: ""},
    Text : {type: String, default: ""},
    Progress : {type: Number, default: 0},
    Deadline : {type: Date, default: Date.now},
}, {
    versionKey: false
});

module.exports = mongoose.model('issue', IssueSchema);
