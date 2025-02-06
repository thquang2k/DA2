const Product = require('../models/productModel')
const Laptop  = require('../models/laptopModel')
const Cellphone = require('../models/cellphoneModel')
const Brand = require('../models/brandModel')
const Category = require('../models/categoryModel')

const getAllLaptop = async (req, res, next) => {
    try {
        let laptops = await Laptop.find()
        if(!laptops){
            return res.status(400).json({
                success: false,
                message: `Cannot get all laptops!`
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `Get all laptops succeeded`,
                laptops: laptops
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAllCellphone = async (req, res, next) => {
    try {
        let cellphones = await Cellphone.find()
        if(!cellphones){
            return res.status(400).json({
                success: false,
                message: `Cannot get all cellphones!`
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `Get all cellphones succeeded`,
                cellphones: cellphones
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        let products = await Product.find()
        if(!products){
            return res.status(400).json({
                success: false,
                message: `Cannot get all products!`
            })
        }else{
            let productList = []
            for(let product of products){
                let item
                if(product.category_id == "LT"){
                    item = await Laptop.findOne({product_id: product.product_id})
                    if(!item){
                        return res.status(400).json({
                            success: false,
                            message: `Cannot find laptop with ID ${product.product_id}!`
                        })
                    }
                }
                if(product.category_id == "CP"){
                    item = await Cellphone.findOne({product_id: product.product_id})
                    if(!item){
                        return res.status(400).json({
                            success: false,
                            message: `Cannot find cellphone with ID ${product.product_id}!`
                        })
                    }
                }
                productList.push(item)
            }
            return res.status(200).json({
                success: true,
                message: `Get all products succeeded`,
                products: productList
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getProductById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: `Product ID is required!`
            })
        }else{
            let product = await Product.findOne({product_id: productId})
            if(!product){
                res.status(400).json({
                    message: `Cannot find product with ID ${productId}!`
                })
            }else{
                switch (product.category_id) {
                    case "LT":
                        let laptop = await Laptop.findOne({product_id:productId})
                        if(!laptop){
                            res.status(400).json({
                                message: `Cannot find laptop with ID ${productId}!`
                            })
                        }else{
                            product = laptop
                        }
                        break;
                    case "CP":
                        let cellphone = await Cellphone.findOne({product_id:productId})
                        if(!cellphone){
                            res.status(400).json({
                                message: `Cannot find laptop with ID ${productId}!`
                            })
                        }else{
                            product = cellphone
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const getLaptopById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: `Product ID is required!`
            })
        }else{
            let product = await Laptop.findOne({product_id: productId})
            if(!product){
                res.status(400).json({
                    message: `Cannot find laptop with ID ${productId}!`
                })
            }else{
                res.status(200).json({
                    message: `Get Laptop with Product ID ${productId} succeeded!`,
                    product: product
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const getCellphoneById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: `Product ID is required!`
            })
        }else{
            let product = await Cellphone.findOne({product_id: productId})
            if(!product){
                res.status(400).json({
                    message: `Cannot find cellphone with ID ${productId}!`
                })
            }else{
                res.status(200).json({
                    message: `Get cellphone with Product ID ${productId} succeeded!`,
                    product: product
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const addProduct = async (req, res, next) => {
    try {
        //Check brand ID
        let brandId = req.body.brandId
        if(!brandId){
            return res.status(400).json({
                success: false,
                message: "brand ID is required"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                return res.status(400).json({
                    success: false,
                    message: `Brand with ID ${brandId} is not exist`
                })
            }
        }
        //Check category ID
        let categoryId = req.body.categoryId
        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: "category ID is required"
            })
        }else{
            let category = await Category.findOne({category_id: categoryId})
            if(!category){
                return res.status(400).json({
                    success: false,
                    message: `Category with ID ${categoryId} is not exist`
                })
            }
        }

        let productCount = await Product.countDocuments()
        let productId = categoryId + brandId + (productCount + 1)
        let genericProduct = new Product({
            product_id: productId,
            category_id: categoryId,
            brand_id: brandId
        })

        let productName = req.body.productName
        if(!productName){
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            })
        }
        
        let productDescription = req.body.productDescription
        if(!productDescription){
            return res.status(400).json({
                success: false,
                message: "Product description is required"
            })
        }

        let cpuBrand = req.body.cpuBrand
        if(!cpuBrand){
            return res.status(400).json({
                success: false,
                message: "Cpu brand is required"
            })
        }

        let productSize = req.body.productSize
        if(!productSize){
            return res.status(400).json({
                success: false,
                message: "Product size is required"
            })
        }

        let featureImgSrc = req.body.featureImgSrc
        if(!featureImgSrc){
            return res.status(400).json({
                success: false,
                message: "Product feature img is required"
            })
        }

        let save, product
        switch (categoryId) {
            case "LT":
                let vgaBrand = req.body.vgaBrand
                if(!vgaBrand){
                    return res.status(400).json({
                        success: false,
                        message: "Vga brand is required"
                    })
                }

                product = new Laptop({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    vga_brand: vgaBrand,
                    size: productSize,
                    feature_img_src: featureImgSrc
                })
                break;
            case "CP":
                let os = req.body.os
                if(!os){
                    return res.status(400).json({
                        success: false,
                        message: "OS name is required"
                    })
                }

                product = new Cellphone({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    os: os,
                    size: productSize,
                    feature_img_src: featureImgSrc
                })
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: `Invalid category ID`
                })
                break;
        }
        save = await product.save();
        if(!save){
            return res.status(400).json({
                success: false,
                message: `Cannot save product with category ID ${categoryId}`
            })
        }else{
            let productSave = await genericProduct.save()
            if(!productSave){
                switch (categoryId) {
                    case "LT":
                        await Laptop.findOneAndDelete({product_id: productId})
                        break;
                    case "CP":
                        await Cellphone.findOneAndDelete({product_id: productId})
                        break;
                    default:
                        break;
                }
                return res.status(400).json({
                    success: false,
                    message: `Cannot save generic product! Rollback saved item in ${categoryId}`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: "Add new product succeeded",
                    generic_product: genericProduct,
                    product: product
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const addLaptop = async (req, res, next) => {
    try {
        //Check brand
        let brandId = req.body.brandId
        if(!brandId){
            return res.status(400).json({
                success: false,
                message: "brand ID is required"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                return res.status(400).json({
                    success: false,
                    message: `Brand with ID ${brandId} is not exist`
                })
            }
        }
        
        let productName = req.body.productName
        if(!productName){
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            })
        }

        let productDescription = req.body.productDescription
        if(!productDescription){
            return res.status(400).json({
                success: false,
                message: "Product description is required"
            })
        }

        let cpuBrand = req.body.cpuBrand
        if(!cpuBrand){
            return res.status(400).json({
                success: false,
                message: "Cpu brand is required"
            })
        }

        let vgaBrand = req.body.vgaBrand
        if(!vgaBrand){
            return res.status(400).json({
                success: false,
                message: "Vga brand is required"
            })
        }
        let productSize = req.body.productSize
        if(!productSize){
            return res.status(400).json({
                success: false,
                message: "Product size is required"
            })
        }
        let featureImgSrc = req.body.featureImgSrc
        if(!featureImgSrc){
            return res.status(400).json({
                success: false,
                message: "Product feature img is required"
            })
        }
        let productCount = await Product.countDocuments()
        let productId = "LT" + brandId + (productCount + 1)
        const laptop = new Laptop({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    vga_brand: vgaBrand,
                    size: productSize,
                    feature_img_src: featureImgSrc
                })

        let save = await laptop.save()
        if(save){
            const product = new Product({
            product_id: productId,
            category_id: "LT",
            brand_id: brandId
            })
            let productSave = await product.save()
            if(productSave){
                return res.status(200).json({
                    success: true,
                    message: `Add laptop succeeded`,
                    laptop: laptop,
                    product: product
                })
            }else{
                //Rollback on laptop save
                await Laptop.findOneAndDelete({product_id: productId})
                return res.status(400).json({
                    success: false,
                    message: "Product save failed!"
                })
            }
        }else{
            return res.status(400).json({
                success: false,
                message: "Laptop save failed!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const addCellphone = async (req, res, next) => {
    try {
        //Check brand
        let brandId = req.body.brandId
        if(!brandId){
            return res.status(400).json({
                success: false,
                message: "brand ID is required"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                return res.status(400).json({
                    success: false,
                    message: `Brand with ID ${brandId} is not exist`
                })
            }
        }
        let productName = req.body.productName
        if(!productName){
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            })
        }
        let productDescription = req.body.productDescription
        if(!productDescription){
            return res.status(400).json({
                success: false,
                message: "Product description is required"
            })
        }
        let cpuBrand = req.body.cpuBrand
        if(!cpuBrand){
            return res.status(400).json({
                success: false,
                message: "Cpu brand is required"
            })
        }
        let os = req.body.os
        if(!os){
            return res.status(400).json({
                success: false,
                message: "os is required"
            })
        }
        let productSize = req.body.productSize
        if(!productSize){
            return res.status(400).json({
                success: false,
                message: "Product size is required"
            })
        }
        let featureImgSrc = req.body.featureImgSrc
        if(!featureImgSrc){
            return res.status(400).json({
                success: false,
                message: "Product feature img is required"
            })
        }
        let productCount = await Product.countDocuments()
        let productId = "CP" + brandId + (productCount + 1)
        const cellphone = new Cellphone({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    os: os,
                    size: productSize,
                    feature_img_src: featureImgSrc
                })

        let save = await cellphone.save()
        if(save){
            const product = new Product({
            product_id: productId,
            category_id: "CP",
            brand_id: brandId
            })
            let productSave = await product.save()
            if(productSave){
                return res.status(200).json({
                    success: true,
                    message: `Cellphone added`,
                    cellphone: cellphone,
                    product: product
                })
            }else{
                //rollback cellphone added
                await Cellphone.findOneAndDelete({product_id: productId})
                return res.status(400).json({
                    success: false,
                    message: "Product save failed!"
                })
            }
        }else{
            return res.status(400).json({
                success: false,
                message: "Cellphone save failed!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const updateLaptopById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: `Product ID is required!`
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(laptop){
                res.status(400).json({
                    message: `Cannot find laptop with ID ${productId}!`
                })
            }else{
                let oldLaptop = laptop
                let brandId = req.body.brandId
                if(brandId){
                    laptop.brand_id = brandId
                    let product = await Product.findOne({product_id: productId})
                    product.brand_id = brandId
                    let save = await product.save()
                    if(!save){
                        res.status(401).json({
                            message: `Cannot update product brand`
                        })
                    }
                }
                let productName = req.body.productName
                if(productName){
                    laptop.product_name = productName
                }
                let description = req.body.description
                if(description){
                    laptop.description = description
                }
                let cpuBrand = req.body.cpuBrand
                if(cpuBrand){
                    laptop.cpu_brand = cpuBrand
                }
                let vgaBrand = req.body.vgaBrand
                if(os){
                    laptop.vga_brand = vgaBrand
                }
                let size = req.body.size
                if(size){
                    laptop.size = size
                }
                let featureImgSrc = req.body.featureImgSrc
                if(featureImgSrc){
                    laptop.feature_img_src = featureImgSrc
                }
                let save = await laptop.save()
                if(!save){
                    res.status(400).json({
                        message: 'Update Laptop failed!'
                    })
                }
                res.status(200).json({
                    message: `Update Laptop with Product ID ${productId} succeeded!`,
                    before: oldLaptop,
                    after: laptop
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const updateCellphoneById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: `Product ID is required!`
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(cellphone){
                res.status(400).json({
                    message: `Cannot find cellphone with ID ${productId}!`
                })
            }else{
                let oldCellphone = cellphone
                let brandId = req.body.brandId
                if(brandId){
                    cellphone.brand_id = brandId
                    let product = await Product.findOne({product_id: productId})
                    product.brand_id = brandId
                    let save = await product.save()
                    if(!save){
                        res.status(401).json({
                            message: `Cannot update product brand`
                        })
                    }
                }
                let productName = req.body.productName
                if(productName){
                    cellphone.product_name = productName
                }
                let description = req.body.description
                if(description){
                    cellphone.description = description
                }
                let cpuBrand = req.body.cpuBrand
                if(cpuBrand){
                    cellphone.cpu_brand = cpuBrand
                }
                let os = req.body.os
                if(os){
                    cellphone.os = os
                }
                let size = req.body.size
                if(size){
                    cellphone.size = size
                }
                let featureImgSrc = req.body.featureImgSrc
                if(featureImgSrc){
                    cellphone.feature_img_src = featureImgSrc
                }
                let save = await cellphone.save()
                if(!save){
                    res.status(400).json({
                        message: 'Update Cellphone failed!'
                    })
                }
                res.status(200).json({
                    message: `Update Cellphone with Product ID ${productId} succeeded!`,
                    before: oldCellphone,
                    after: cellphone
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const removeProductById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: "Product ID is required!"
            })
        }else{
            let product = await Product.findOne({product_id: productId})
            if(!product){
                res.status(400).json({
                    message: `Product with ID ${productId} is not exist!`
                })
            }else{
                let remove
                switch (product.category_id) {
                    case "LT":
                        remove = await Laptop.findOneAndDelete({product_id: productId})
                        break;
                    case "CP":
                        remove = await Cellphone.findOneAndDelete({product_id: productId})
                        break;
                    default:
                        res.status(400).json({
                            message: `Category with ID ${product.category_id} is not exist!`
                        })
                        break;
                }
                if(remove){
                    let productRemove = await Product.findOneAndDelete({product_id: productId})
                    if(productRemove){
                        res.status(200).json({
                            message: `Product with ID ${productId} is removed!`
                        })
                    }else{
                        res.status(400).json({
                            message: `Product with ID ${productId} is failed to remove!`
                        })
                    }
                }else{
                    res.status(400).json({
                        message: `Product with ID ${productId} and Category ID ${product.category_id} is failed to remove!`
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const removeLaptopById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: "Product ID is required!"
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(!laptop){
                res.status(400).json({
                    message: `Laptop with ID ${productId} is not exist!`
                })
            }else{
                let remove = await Laptop.findOneAndDelete({product_id: productId})
                if(remove){
                    let productRemove = await Product.findOneAndDelete({product_id: productId})
                    if(productRemove){
                        res.status(200).json({
                            message: `Product with ID ${productId} is removed!`
                        })
                    }else{
                        let save = await laptop.save()
                        res.status(400).json({
                            message: `Product with ID ${productId} is failed to remove!`
                        })
                    }
                }else{
                    res.status(400).json({
                        message: `Laptop with ID ${productId} is failed to remove!`
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const removeCellphoneById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            res.status(400).json({
                message: "Product ID is required!"
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(!cellphone){
                res.status(400).json({
                    message: `Cellphone with ID ${productId} is not exist!`
                })
            }else{
                let remove = await Cellphone.findOneAndDelete({product_id: productId})
                if(remove){
                    let productRemove = await Product.findOneAndDelete({product_id: productId})
                    if(productRemove){
                        res.status(200).json({
                            message: `Product with ID ${productId} is removed!`
                        })
                    }else{
                        let save = await cellphone.save()
                        res.status(400).json({
                            message: `Product with ID ${productId} is failed to remove!`
                        })
                    }
                }else{
                    res.status(400).json({
                        message: `Cellphone with ID ${productId} is failed to remove!`
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllProduct,
    getAllCellphone,
    getAllLaptop,
    getProductById,
    getCellphoneById,
    getLaptopById,
    addProduct,
    addCellphone,
    addLaptop,
    updateCellphoneById,
    updateLaptopById,
    removeProductById,
    removeLaptopById,
    removeCellphoneById
}