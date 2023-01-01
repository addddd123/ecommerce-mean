const mongoose=require('mongoose')

const ColorSchema=new mongoose.Schema({
    productID:{type:mongoose.Types.ObjectId},
    categoryID:{type:mongoose.Types.ObjectId},
    availableColors:[
        {
            color:{type:String},
            unitsInStock:{type:Number}
        }
    ]
})
module.exports = mongoose.model('colors', ColorSchema)