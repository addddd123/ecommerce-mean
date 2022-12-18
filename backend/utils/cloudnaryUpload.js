const cloudinary = require('cloudinary')
const path = require('path');
// const fs = require('fs-extra');
const { genrateError } = require('./errorHandler');
const fs= require("fs");

const dotenv = require('dotenv')
    .config({ path: path.resolve(__dirname, '../env/.env') });

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const cloudinaryUpload = async (file, res, next) => {
    try {
        let imageUrl;
        await cloudinary.v2.uploader.upload(`${file.path}`,
            { public_id: file.filename },
            (error, result) => {

                imageUrl = result.secure_url
            }

        );
        // Delete the file from server after uploading to multer
        fs.unlink(path.join(__dirname,`../uploads/${file.filename}`),(err,cb)=>{});
        return imageUrl
    }
    catch (err) {
        throw genrateError(err,400)
    }

}
module.exports = cloudinaryUpload