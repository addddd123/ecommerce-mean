let mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({

    categoryID: 
        {type: mongoose.Types.ObjectId,ref: 'category'},
    productName: String,
    productDescription: String,
    sellerID: {
        type: mongoose.Types.ObjectId
    },
    price: {
        type: Number
    },
    itemWeight: {
        type: String
    },
    productAvailble: { type: Boolean },
    unitsInStock: { type: Number },
    imageUrl: [{
        type: String
    }],
    ranking: Number,
})

module.exports = mongoose.model('products', ProductsSchema)