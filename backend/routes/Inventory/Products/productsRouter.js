const express = require('express');
const router = express.Router();
// const verifyToken=require('../../../middleware/verifyToken')[0]
// const verifyAdmin=require('../../../middleware/verifyToken')[1]
const productController =require('../../../controllers/Inventory/Products/products');
const Uploader = require('../../../middleware/fileUpload');

let upload=Uploader()
router.post('/add-product',upload.single('image'),productController.addProduct)



module.exports=router