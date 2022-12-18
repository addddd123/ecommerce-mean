const categoryModel = require('../../models/category/category')
const cloudinaryUpload = require('../../utils/cloudnaryUpload')
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