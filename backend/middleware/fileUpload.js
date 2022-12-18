let path = require('path')
const fs = require('fs')


const multer = require('multer')

function Uploader(req, res, next) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })

    var upload = multer({
        storage: storage
    });

    return upload;
}

module.exports = Uploader