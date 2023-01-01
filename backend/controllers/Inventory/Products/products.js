
const productsModel = require('../../../models/Inventory/Products/products')
const colorsModel = require('../../../models/Inventory/Products/colors')
const sizesModel = require('../../../models/Inventory/Products/sizes')
const cloudinaryUpload = require('../../../utils/cloudnaryUpload')
const { default: mongoose } = require('mongoose')
exports.addProduct = async (req, res, next) => {
    try {
        const { categoryID, sellerID } = req.body
        if (!(mongoose.Types.ObjectId.isValid(categoryID) && mongoose.Types.ObjectId.isValid(sellerID))) {
            return res.json({ error: true, message: "Not valid object id" })
        }
        if (!req.file) {
            req.body.imageUrl = []
            req.body.imageUrl.push(await cloudinaryUpload(req.file, res, next))
        }



        // const colors=new productsModel(req.body)

        delete req.body.availableSizes
        const newProduct = new productsModel(req.body)
        const addedProduct = await newProduct.save()
        let sizeModel = {
            categoryID,
            sellerID,
            productID: addedProduct._id,
            availableSizes: [

                {
                    size: req.body.size,
                    unitsInStock:req.body.unitsInStock
                }
            ]
        }
        let colorModel={
            categoryID,
            sellerID,
            productID: addedProduct._id,
            availableColors: [

                {
                    color: req.body.color,
                    unitsInStock:req.body.unitsInStock
                }
            ]
        }
        const sizes = new sizesModel(sizeModel)
        const color=new colorsModel(colorModel)
        await color.save()
        await sizes.save()

        res.send('added')
    }
    catch (err) {
        return next(err)
    }
}