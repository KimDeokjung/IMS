var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const review = require('../modules/review');

// Get review Page.
router.get('/', function(req, res, next) {
    res.render('reviewCRUD_test', { title: 'Express' });
});

//Review 생성 Post API
router.post('/insertMany', function(req, res, next){
    review.insertMany(req, res, function(callback){
        res.send(callback)
    });
})


//Review 검색 Post API
router.post('/find', function(req, res, next){
    review.find(req, res, function(callback){
        res.send(callback)
    });
})


//몽고 DB 선택 리스트 삭제 Delete API
router.delete('/deleteMany',function (req,res,next){
    review.deleteMany(req,res,function (callback){
        res.send(callback)
    })
})


//몽고 DB 선택 리스트 업데이트 Petch API
router.patch('/updateMany',function (req,res,next){
    review.updateMany(req,res,function (callback){
        res.send(callback)
    })
})

module.exports = router;
