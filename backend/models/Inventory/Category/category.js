
let mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryType: {
        type: String,
        enum: ["ELECTRONICS", "CLOTHING", "MEDICINE", "GROCERY", "BOOKS", "STATIONERY"],
        required:true,
        unique:true
    },
    subCateGoryType: {
        type: String,
        // required:true
        // enum:["MOBILE","HEADPHONE","EARBUDS","WASHING MACHINE","IRON","TV","TELEVISION",
        // "LAPTOPS","GAMES","LAM"]
    },
    image: {
        data: Buffer,
        contentType: String
    },
    categoryDescription: {
        type: String
    },
    imageUrl: { type: String }
})
module.exports = mongoose.model('category', CategorySchema)