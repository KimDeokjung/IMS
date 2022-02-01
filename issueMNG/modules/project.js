var mongoose = require('mongoose');
var Project = require("../model/project")

//lastUpdate(22-01-19)
//작업 : req로 들어온 json을 mongoDB에 저장 / mongoDB에 저장 후 저장 결과를 res에 보낸다.
//return : Boolean
exports.insertMany = function(req, res, callback){

    var project = new Project({
        Title : req.body.projectTitle,
        Explain : req.body.projectExplain,
        Category : req.body.projectCategory,
        Host : req.body.projectHost,
        Members : req.body.projectMembers,
        Created: Date.now()
    })

    project
        .save()
        .then(newPost => {
            return callback(true)
        })
        .catch(err => {
            return callback(false)
        });

}

//lastUpdate(22-01-13)
//작업 : 현재 MongoDB에 들어있는 모든 데이터를 ArrayList형식으로 callback한다
//return : ArrayList {
//                  projectTitle : String
//                  projectExplain : String
//                  projectUser : String
//              }
exports.find = function(req, res, callback){
    Project.find(function(err, project){
        if(err) console.log(err);
        return callback(project)
    })
}

exports.findOne = function(req, res, callback){
    let projectID = req.body.projectID
    let resultList = []
    Project.find(function(err, project){
        if(err) console.log(err);
        for(let i=0; i<project.length; i++){
            if(String(project[i]._id) === projectID){
                resultList.push(project[i])
                return callback(resultList)
            }
        }
        return callback(resultList)
    })
}


//lastUpdate(22-01-13)
//작업 : 현재 MongoDB에 들어있는 데이터중 req로 들어온 ID를 가진걸 삭제한다.
//return : Boolean
exports.deleteMany = function (req, res, callback){

    Project.findById(req.body.ID, function(err, project){
        if(err) return callback(false);
        if(project === undefined || project === null || project.length === 0){
            return callback(false)
        }else{
            Project.deleteOne({ _id: req.body.ID }, function(err, output){
                if(err) return callback(false);
            })
        }
    });
    return callback(true)
}


//lastUpdate(22-01-14)
//작업 : 현재 MongoDB에 들어있는 데이터중 req로 들어온 ID를 새로운 값으로 변경한다.
//return : Boolean
exports.updateMany = function (req, res, callback){

    Project.findById(req.body.ID, function(err, project){

        if(err) return callback(false);
        if(project === undefined || project === null || project.length === 0){
            return callback(false)
        }else{
            if(req.body.Explain.length === 0){
                return callback(false)
            }
            if(req.body.Explain) project.Explain = req.body.Explain;

            project.save(function(err){
                if(err) return callback(false);
                return callback(true)
            });
        }
    });
}
