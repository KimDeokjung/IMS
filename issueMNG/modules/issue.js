var mongoose = require('mongoose');
var Issue = require("../model/issue")

//lastUpdate(22-01-19)
//작업 : req로 들어온 json을 mongoDB에 저장 / mongoDB에 저장 후 저장 결과를 res에 보낸다.
//return : Boolean
exports.insertMany = function(req, res, callback){
    var issue = new Issue({
        ProjectId : req.body.issueProjectId,
        Text : req.body.issueText,
        Progress : req.body.issueProgress,
        Deadline : req.body.issueDeadline,
    })

    issue
        .save()
        .then(newPost => {
            return callback(true)
        })
        .catch(err => {
            return callback(false)
        });
}


//lastUpdate(22-01-19)
//작업 : 현재 MongoDB에 들어있는 모든 데이터를 ArrayList형식으로 callback한다
//return : ArrayList
exports.find = function(req, res, callback){
    Issue.find(function(err, issue){
        if(err) console.log(err);
        return callback(issue)
    })
}


//lastUpdate(22-01-19)
//작업 : 현재 MongoDB에 들어있는 데이터중 req로 들어온 ID를 가진걸 삭제한다.
//return : Boolean
exports.deleteMany = function (req, res, callback){

    Issue.findById(req.body.ID, function(err, issue){
        if(err) return callback(false);
        if(issue === undefined || issue === null || issue.length === 0){
            return callback(false)
        }else{
            Issue.deleteOne({ _id: req.body.ID }, function(err, output){
                if(err) return callback(false);
            })
        }
    });
    return callback(true)
}


//lastUpdate(22-01-19)
//작업 : 현재 MongoDB에 들어있는 데이터중 req로 들어온 ID를 새로운 값으로 변경한다.
//return : Boolean
exports.updateMany = function (req, res, callback){

    Issue.findById(req.body.ID, function(err, issue){

        if(err) return callback(false);
        if(issue === undefined || issue === null || issue.length === 0){
            return callback(false)
        }else{
            if(req.body.Text.length === 0){
                return callback(false)
            }
            if(req.body.Text) issue.Text = req.body.Text;

            issue.save(function(err){
                if(err) return callback(false);
                return callback(true)
            });
        }
    });
}






// const mongoose = require('mongoose');
//
// // Define Schemes
// const issueSchema = new Issue
//
//
// // Create new issue document
// issueSchema.statics.create = function (payload) {
//     // this === Model
//     const issue = new this(payload);
//     // return Promise
//     return issue.save();
// };
//
// // Find All
// issueSchema.statics.findAll = function () {
//     // return promise
//     // V4부터 exec() 필요없음
//     return this.find({});
// };
//
// // Find One by issueID
// issueSchema.statics.findOneByIssueID = function (issueID) {
//     return this.findOne({ issueID });
// };
//
// // Update by issueID
// issueSchema.statics.updateByIssueID = function (issueID, payload) {
//     // { new: true }: return the modified document rather than the original. defaults to false
//     return this.findOneAndUpdate({ issueID }, payload, { new: true });
// };
//
// // Delete by issueID
// issueSchema.statics.deleteByIssueID = function (issueID) {
//     return this.remove({ issueID });
// };
//
// module.exports = mongoose.model('Issue', issueSchema);
