var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const project = require('../modules/project');

const validateProject = [
    body('projectTitle').notEmpty().withMessage('title is missing'),
    body('projectUser').notEmpty().withMessage('user is missing'),
];

// Get Project Page.
router.get('/', function(req, res, next) {
    res.render('projectCRUD_test', { title: 'Express' });
});

//Project 생성 Post API
//req : json 형식{
//                  projectTitle : String
//                  projectExplain : String
//                  projectHost : String
//                  projectCategory : String
//                  projectMembers : Array
//               }
//res : boolean 형태 (동작이 잘 끝났는지 여부)
router.post('/insertMany', function(req, res, next){
  project.insertMany(req, res, function(callback){
    res.send(callback)
  });
})


//Project 검색 Post API
//res : boolean 형태 (동작이 잘 끝났는지 여부)
router.post('/find', function(req, res, next){
    project.find(req, res, function(callback){
        res.send(callback)
    });
})


//몽고 DB 선택 리스트 삭제 Delete API
//req : json 형식 ( ID : 삭제 할 리스트의 아이디)
//res : Boolean (삭제 확인 여부)
router.delete('/deleteMany',function (req,res,next){
    project.deleteMany(req,res,function (callback){
        res.send(callback)
    })
})


//몽고 DB 선택 리스트 업데이트 Petch API
//req : json 형식 ( ID : 업데이트 할 리스트의 아이디, Explain : 업데이트할 새로운 내용)
//res : Boolean (업데이트 확인 여부)
router.patch('/updateMany',function (req,res,next){
    project.updateMany(req,res,function (callback){
        res.send(callback)
    })
})


module.exports = router;
