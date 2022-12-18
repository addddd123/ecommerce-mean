const express = require('express');
const router = express.Router();
const authController=require('../../controllers/Auth/authController')
const verifyToken=require('../../middleware/verifyToken')[0]
const verifyAdmin=require('../../middleware/verifyToken')[1]

router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/verify-email/:token',authController.verifyEmail)
router.post('/forgot-password',authController.forgotPassword)
router.post('/reset-password',authController.resetPassword)
router.post('/test',verifyToken,verifyAdmin,(req,res)=>{
    return res.send('hi')
})


module.exports=router