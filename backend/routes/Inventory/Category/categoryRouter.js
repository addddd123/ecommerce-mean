const express = require('express');
const router = express.Router();
// const verifyToken=require('../../../middleware/verifyToken')[0]
// const verifyAdmin=require('../../../middleware/verifyToken')[1]
const categoryController =require('../../../controllers/Inventory/category/category');
const Uploader = require('../../../middleware/fileUpload');

let upload=Uploader()
router.post('/add-category',upload.single('image'),categoryController.addCategory)
router.get('/category-count',categoryController.totalCategoriesCount)


module.exports=router