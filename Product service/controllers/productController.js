const Product = require('../models/productModel')
const Laptop  = require('../models/laptopModel')
const Cellphone = require('../models/cellphoneModel')

const getAllLaptop = async (req, res, next) => {
    try {
        let laptops = await Laptop.find()
        if(!laptop){
            res.status(400).json({
                message: `Cannot get all laptops!`
            })
        }else{
            res.status(200).json({
                message: `Get all laptops succeeded`,
                laptops: laptops
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAllCellphone = async (req, res, next) => {
    try {
        let cellphones = await Cellphone.find()
        if(!cellphones){
            res.status(400).json({
                message: `Cannot get all cellphones!`
            })
        }else{
            res.status(200).json({
                message: `Get all cellphones succeeded`,
                cellphones: cellphones
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        let products = await Product.find()
        if(!products){
            res.status(400).json({
                message: `Cannot get all products!`
            })
        }else{
            let productList = []
            for(const product of products){
                let item
                if(product.category_id == "LT"){
                    item = await Laptop.findOne({product_id: product.product_id})
                }
                if(product.category_id == "CP"){
                    item = await Cellphone.findOne({product_id: product.product_id})
                }
                productList.push(item)
            }
            res.status(200).json({
                message: `Get all products succeeded`,
                products: productList
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}