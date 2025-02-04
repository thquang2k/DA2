const LaptopVariant = require('../models/laptopVariantModel')
const CellphoneVariant = require('../models/cellphoneVariantModel')

const getAllLaptopVariantsByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId
    if(!productId){
        res.status(400).json({
            message: "Product ID is required"
        })
    }else{
        let variants = await LaptopVariant.find({product_id: productId})
        if(!variants){
            res.status(400).json({
                message: `Laptop with ID ${productId} does not have any variants!`
            })
        }else{
            res.status(200).json({
                message: `Get all variants of laptop with ID ${productId} succeeded!`,
                variants: variants
            })
        }
    }
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const getAllCellphoneVariantsByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId
    if(!productId){
        res.status(400).json({
            message: "Product ID is required"
        })
    }else{
        let variants = await CellphoneVariant.find({product_id: productId})
        if(!variants){
            res.status(400).json({
                message: `Cellphone with ID ${productId} does not have any variants!`
            })
        }else{
            res.status(200).json({
                message: `Get all variants of cellphone with ID ${productId} succeeded!`,
                variants: variants
            })
        }
    }
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

module.exports = {
    getAllCellphoneVariantsByProductId,
    getAllLaptopVariantsByProductId
}