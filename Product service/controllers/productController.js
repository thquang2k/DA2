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
            return res.status(400).json({
                success: false,
                message: `Product ID is required!`
            })
        }else{
            let product = await Product.findOne({product_id: productId})
            if(!product){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find product with ID ${productId}!`
                })
            }else{
                switch (product.category_id) {
                    case "LT":
                        let laptop = await Laptop.findOne({product_id:productId})
                        if(!laptop){
                            return res.status(400).json({
                                success: false,
                                message: `Cannot find laptop with ID ${productId}!`
                            })
                        }else{
                            return res.status(200).json({
                                success: true,
                                message: `Get product with ID ${productId} succeeded!`,
                                product: laptop
                            })
                        }
                    case "CP":
                        let cellphone = await Cellphone.findOne({product_id:productId})
                        if(!cellphone){
                            return res.status(400).json({
                                success: false,
                                message: `Cannot find product with ID ${productId}!`
                            })
                        }else{
                            return res.status(200).json({
                                success: true,
                                message: `Get product with ID ${productId} succeeded!`,
                                product: cellphone
                            })
                        }
                    default:
                        break;
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const getLaptopById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: `Product ID is required!`
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(!laptop){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find laptop with ID ${productId}!`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get Laptop with ID ${productId} succeeded!`,
                    laptop: laptop
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const getCellphoneById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: `Product ID is required!`
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(!cellphone){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find cellphone with ID ${productId}!`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get cellphone with Product ID ${productId} succeeded!`,
                    cellphone: cellphone
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
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
        let genericProduct = new Product({
            product_id: "temp",
            category_id: categoryId,
            brand_id: brandId
        })
        genericProduct.product_id = genericProduct._id.toString()
        genericProduct.product_id.replace('new Object Id(', '')
        genericProduct.product_id.replace(')', '')
        let productId = genericProduct.product_id

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
            return res.status(400).json({
                success: false,
                message: `Product ID is required!`
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(!laptop){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find laptop with ID ${productId}!`
                })
            }else{
                let product, oldBrandId
                let brandId = req.body.brandId
                if(brandId){
                    let brand = await Brand.findOne({brand_id: brandId})
                    if(!brand){
                        return res.status(400).json({
                            success: false,
                            message: `Brand with ID ${brandId} is not exist!`
                        })
                    }else{
                        oldBrandId = laptop.brand_id
                        laptop.brand_id = brandId
                        product = await Product.findOne({product_id: productId})
                        product.brand_id = brandId
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
                if(vgaBrand){
                    laptop.vga_brand = vgaBrand
                }
                let productSize = req.body.productSize
                if(productSize){
                    laptop.size = productSize
                }
                let featureImgSrc = req.body.featureImgSrc
                if(featureImgSrc){
                    laptop.feature_img_src = featureImgSrc
                }

                let save = await laptop.save()
                if(!save){
                    return res.status(400).json({
                        success: false,
                        message: 'Update Laptop failed!'
                    })
                }else{
                    if(product){
                        let productSave = await product.save()
                        if(!productSave){
                            laptop.brand_id = oldBrandId
                            await laptop.save()
                            return res.status(400).json({
                                success: false,
                                message: "Generic product update save failed!"
                            })
                        }else{
                            return res.status(200).json({
                                success: true,
                                message: `Update Laptop with Product ID ${productId} succeeded!`,
                                laptop: laptop,
                                product: product
                            })
                        }
                    }
                    return res.status(200).json({
                        success: true,
                        message: `Update Laptop with Product ID ${productId} succeeded!`,
                        laptop: laptop
                    })
                }
                
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const updateCellphoneById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: `Product ID is required!`
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(!cellphone){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find cellphone with ID ${productId}!`
                })
            }else{
                let product, oldBrandId
                let brandId = req.body.brandId
                if(brandId){
                    let brand = await Brand.findOne({brand_id: brandId})
                    if(!brand){
                        return res.status(400).json({
                            success: false,
                            message: `Brand with ID ${brandId} is not exist!`
                        })
                    }else{
                        oldBrandId = cellphone.brand_id
                        cellphone.brand_id = brandId
                        product = await Product.findOne({product_id: productId})
                        product.brand_id = brandId
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
                let vgaBrand = req.body.vgaBrand
                if(vgaBrand){
                    cellphone.vga_brand = vgaBrand
                }
                let productSize = req.body.productSize
                if(productSize){
                    cellphone.size = productSize
                }
                let featureImgSrc = req.body.featureImgSrc
                if(featureImgSrc){
                    cellphone.feature_img_src = featureImgSrc
                }

                let save = await cellphone.save()
                if(!save){
                    return res.status(400).json({
                        success: false,
                        message: 'Update Cellphone failed!'
                    })
                }else{
                    if(product){
                        let productSave = await product.save()
                        if(!productSave){
                            cellphone.brand_id = oldBrandId
                            await cellphone.save()
                            return res.status(400).json({
                                success: false,
                                message: "Generic product update save failed!"
                            })
                        }else{
                            return res.status(200).json({
                                success: true,
                                message: `Update Cellphone with Product ID ${productId} succeeded!`,
                                cellphone: cellphone,
                                product: product
                            })
                        }
                    }
                    return res.status(200).json({
                        success: true,
                        message: `Update Cellphone with Product ID ${productId} succeeded!`,
                        cellphone: cellphone
                    })
                }
                
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const removeProductById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required!"
            })
        }else{
            let product = await Product.findOne({product_id: productId})
            if(!product){
                return res.status(400).json({
                    success: false,
                    message: `Product with ID ${productId} is not exist!`
                })
            }else{
                let remove, oldItem
                switch (product.category_id) {
                    case "LT":
                        oldItem = await Laptop.findOne({product_id: productId})
                        remove = await Laptop.findOneAndDelete({product_id: productId})
                        break;
                    case "CP":
                        oldItem = await Cellphone.findOne({product_id: productId})
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
                        return res.status(200).json({
                            success: true,
                            message: `Product with ID ${productId} is removed!`
                        })
                    }else{
                        await oldItem.save()
                        return res.status(400).json({
                            success: false,
                            message: `Product with ID ${productId} is failed to remove!`
                        })
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: `Product with ID ${productId} and Category ID ${product.category_id} is failed to remove!`
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const removeLaptopById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required!"
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(!laptop){
                res.status(400).json({
                    success: false,
                    message: `Laptop with ID ${productId} is not exist!`
                })
            }else{
                let remove = await Laptop.findOneAndDelete({product_id: productId})
                if(remove){
                    let productRemove = await Product.findOneAndDelete({product_id: productId})
                    if(productRemove){
                        return res.status(200).json({
                            success: true,
                            message: `Laptop with ID ${productId} is removed!`
                        })
                    }else{
                        await laptop.save()
                        return res.status(400).json({
                            success: false,
                            message: `Product with ID ${productId} is failed to remove!`
                        })
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: `Laptop with ID ${productId} is failed to remove!`
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const removeCellphoneById = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required!"
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(!cellphone){
                res.status(400).json({
                    success: false,
                    message: `Cellphone with ID ${productId} is not exist!`
                })
            }else{
                let remove = await Cellphone.findOneAndDelete({product_id: productId})
                if(remove){
                    let productRemove = await Product.findOneAndDelete({product_id: productId})
                    if(productRemove){
                        return res.status(200).json({
                            success: true,
                            message: `Cellphone with ID ${productId} is removed!`
                        })
                    }else{
                        await cellphone.save()
                        return res.status(400).json({
                            success: false,
                            message: `Product with ID ${productId} is failed to remove!`
                        })
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: `Cellphone with ID ${productId} is failed to remove!`
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
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