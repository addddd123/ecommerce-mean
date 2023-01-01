const express = require('express');
const router = express.Router();
const authRouter=require('./Auth/authRouter')
const categoryRouter=require('./Inventory/Category/categoryRouter')
const productsRouter=require('./Inventory/Products/productsRouter')

router.use('/auth',authRouter)
router.use('/category',categoryRouter)
router.use('/product',productsRouter)
module.exports=router
