const mongoose = require('mongoose')

const productUploadSchema = new mongoose.Schema({
    upload_id: {
        type: String,
        required: true,
        unique: true
    },
    product_id: {
        type: String
    },
    variant_id: {
         type: String
    },
    upload_src: {
        type: String,
        required: true
    }
})

const productUploadModel = mongoose.model("ProductUpload", productUploadSchema)

module.exports = productUploadModel