var express = require('express');
var router = express.Router();
const project = require('../modules/project');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainCRUD_test', { title: 'Express' });
});

/* Get Issue Page. */
router.get('/issueTest', function(req, res, next) {
  res.render('issueCRUD_test', { title: 'Express' });
});

/* Get Project Page. */
router.get('/projectTest', function(req, res, next) {
  res.render('projectCRUD_test', { title: 'Express' });
});

/* Get Review Page. */
router.get('/reviewTest', function(req, res, next) {
  res.render('reviewCRUD_test', { title: 'Express' });
});


//Project 생성 Post API
//req : json 형식{
//                  projectTitle : String
//                  projectExplain : String
//                  projectUser : String
//               }
//res : boolean 형태 (동작이 잘 끝났는지 여부)
router.post('/project/create', function(req, res, next){
  project.putData(req, res, function(callback){
    res.send(callback)
  });
})


//Project 생성 Post API
//req : json 형식{
//                  projectTitle : String
//                  projectExplain : String
//                  projectUser : String
//               }
//res : boolean 형태 (동작이 잘 끝났는지 여부)
router.post('/project/read', function(req, res, next){
  project.readData(req, res, function(callback){
    res.send(callback)
  });
})


//몽고 DB 선택 리스트 삭제 Delete API
//req : json 형식 ( ID : 삭제 할 리스트의 아이디)
//res : Boolean (삭제 확인 여부)
router.delete('/project/delete',function (req,res,next){
  project.delData(req,res,function (callback){
    res.send(callback)
  })
})


//몽고 DB 선택 리스트 업데이트 Petch API
//req : json 형식 ( ID : 업데이트 할 리스트의 아이디, Explain : 업데이트할 새로운 내용)
//res : Boolean (업데이트 확인 여부)
router.patch('/project/update',function (req,res,next){
  project.upDateData(req,res,function (callback){
    res.send(callback)
  })
})


module.exports = router;
