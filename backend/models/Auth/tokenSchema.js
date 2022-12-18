let mongoose=require('mongoose')
let tokenSchema=new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,
        ref: 'userModel'},
    refreshToken:String
})

module.exports=mongoose.model('tokenModel',tokenSchema)