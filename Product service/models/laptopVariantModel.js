const mongoose = require('mongoose')

const laptopVariantSchema = new mongoose.Schema({
    variant_id: {
        type: String,
        required: true,
        unique: true
    },
    product_id: {
        type: String,
        required: true
    },
    variant_name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    promotion_id: {
        type: String
    }
},{
    timestamps: true
})

const laptopVariantModel = mongoose.model("Laptop_Variant", laptopVariantSchema)

module.exports = laptopVariantModel