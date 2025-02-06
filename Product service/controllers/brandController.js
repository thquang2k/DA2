const Brand = require('../models/brandModel')

const getAllBrand = async (req, res, next) => {
    try {
        let brands = await Brand.find()
    if(!brands){
        return res.status(400).json({
            success: false,
            message: "Cannot get all brands"
        })
    }else{
        return res.status(200).json({
            success: true,
            message: "Get all brands succeeded!",
            brands: brands
        })
    }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }   
}

module.exports = {
    getAllBrand
}