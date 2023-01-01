const mongoose = require('mongoose')

const SizeSchema = new mongoose.Schema({
    productID: { type: mongoose.Types.ObjectId },
    categoryID: { type: mongoose.Types.ObjectId },
    sellerID: { type: mongoose.Types.ObjectId },
    availableSizes: [
        {
            size: { type: String },
            unitsInStock: { type: Number }
        }
    ]
})
module.exports = mongoose.model('sizes', SizeSchema)