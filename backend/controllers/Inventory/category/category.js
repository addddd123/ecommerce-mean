const { default: mongoose } = require('mongoose')
const categoryModel = require('../../../models/Inventory/Category/category')
const cloudinaryUpload = require('../../../utils/cloudnaryUpload')
const { statusCodes } = require('../../../utils/errorHandler')
let getCount = async (query = {}) => {
    return await categoryModel.find(query)
        .count()
        .collation({ locale: 'en', strength: 1 })
  
}

exports.addCategory = async (req, res, next) => {
    try {
        if(req.file){
            req.body.imageUrl=await cloudinaryUpload(req.file,res,next)
        }
        const category = new categoryModel(req.body)
        await category.save()
        return res.status(200).json({ error: false, category: category })
    }
    catch (err) {
        next(err)
    }

}
exports.totalCategoriesCount = async (req, res, next) => {
    try {
        let { countByCategoryType, countBySubCategory } = req.query
     
        if (countBySubCategory) {

            const count = await getCount({ subCateGoryType: countBySubCategory })
            console.log(count)
            return res.json({ error: false, count: count })
        }
        else if (countByCategoryType) {
            const count = await getCount({ categoryType: countByCategoryType })
            return res.json({ error: false, count: count })
        }
        else{
            const count = await getCount()
            return res.json({ error: false, count: count })
        }
    }
    catch (err) {
        next(err)
    }

}

exports.deleteCategory=async (req,res,next) => {
    try{
        const id=req.params
        console.log(req.params,'########')
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:true,message:"Id is not valid mongodb id"})
        }
        const categoryDeleted=await categoryModel.findByIdAndDelete(mongoose.Types.ObjectId(id))
        if(categoryDeleted){
            return res.status(200).json({error:false,message:"category deleted successfully",
            categoryDeleted})
        }
        else{
            return res.status(statusCodes.Not_Found).json({error:false,message:"couldnt delete category"})
        }
    }
    catch(err){
        next(err)
    }
}