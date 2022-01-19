var mongoose = require('mongoose');
var Project = require("../model/review")

//lastUpdate(22-01-19)
//작업 : req로 들어온 json을 mongoDB에 저장 / mongoDB에 저장 후 저장 결과를 res에 보낸다.
//return : Boolean
exports.insertMany = function(req, res, callback){

}

//lastUpdate(22-01-19)
//작업 : 현재 MongoDB에 들어있는 모든 데이터를 ArrayList형식으로 callback한다
//return : ArrayList {
//              }
exports.find = function(req, res, callback){

}


//lastUpdate(22-01-19)
//작업 : 현재 MongoDB에 들어있는 데이터중 req로 들어온 ID를 가진걸 삭제한다.
//return : Boolean
exports.deleteMany = function (req, res, callback){

}


//lastUpdate(22-01-19)
//작업 : 현재 MongoDB에 들어있는 데이터중 req로 들어온 ID를 새로운 값으로 변경한다.
//return : Boolean
exports.updateMany = function (req, res, callback){

}
