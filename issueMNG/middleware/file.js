const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const util = require('util');
const path = require('path');
const config = require('../config/config')

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req.baseUrl === '/user'){
            cb(null, path.join(__dirname,'..','upload','user'))
        }else{
            cb(null, path.join(__dirname,'..','upload','file'))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const memoryStorage = multer.memoryStorage();

const gridFsStorage = new GridFsStorage({
    url: config.database.serverURL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // for thumbnail and profile image
            if (req.baseUrl === '/user') {
                return {
                    bucketName: 'user-images',
                    filename: ``
                };
            }
        } else {
            // pdf, docx, txt
            return {
                bucketName: 'files',
                filename: ``
            };
        }
    }
});

// var upload = multer({ storage: storage }).single('file');
// var uploadFilesMiddleware = util.promisify(upload);
// module.exports = uploadFilesMiddleware;

module.exports.upload = multer({ storage: diskStorage })
