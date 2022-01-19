var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const Issue = require('../modules/issue');

// Get issue Page.
router.get('/', function(req, res, next) {
    res.render('issueCRUD_test', { title: 'Express' });
});

//Issue 생성 Post API
//req : json 형식{
//                  issueProjectId : String
//                  issueText : String
//                  issueProgress : String
//                  issueDeadline : Date
//               }
//res : boolean 형태 (동작이 잘 끝났는지 여부)
router.post('/insertMany', function(req, res, next){
    issue.insertMany(req, res, function(callback){
        res.send(callback)
    });
})


//Issue 검색 Post API
router.post('/find', function(req, res, next){
    issue.find(req, res, function(callback){
        res.send(callback)
    });
})


//몽고 DB 선택 리스트 삭제 Delete API
router.delete('/deleteMany',function (req,res,next){
    issue.deleteMany(req,res,function (callback){
        res.send(callback)
    })
})


//몽고 DB 선택 리스트 업데이트 Petch API
router.patch('/updateMany',function (req,res,next){
    issue.updateMany(req,res,function (callback){
        res.send(callback)
    })
})

module.exports = router;

// router.post('/find', (req, res) => {
//     Issue.findAll()
//         .then((todos) => {
//             if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
//             res.send(`find successfully: ${todos}`);
//         })
//         .catch(err => res.status(500).send(err));
// });
//
// // Create new issue document
// router.post('/insertMany', (req, res) => {
//     Issue.create(req.body)
//         .then(issue => res.send(issue))
//         .catch(err => res.status(500).send(err));
// });
//
// // Update by IssueID
// router.put('/todoid/:todoid', (req, res) => {
//     Issue.updateByIssueID(req.params.todoid, req.body)
//         .then(todo => res.send(todo))
//         .catch(err => res.status(500).send(err));
// });
//
// // Delete by IssueID
// router.delete('/todoid/:todoid', (req, res) => {
//     Issue.deleteByIssueID(req.body.ID)
//         .then(() => res.sendStatus(200))
//         .catch(err => res.status(500).send(err));
// });
//
//
//
//
//
// module.exports = router;
