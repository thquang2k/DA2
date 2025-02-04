const Product = require('../models/productModel')
const Laptop  = require('../models/laptopModel')
const Cellphone = require('../models/cellphoneModel')
const Brand = require('../models/brandModel')
const Category = require('../models/categoryModel')

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
        let brandId = req.body.brandId
        if(!brandId){
            res.status(400).json({
                message: "brand ID is required"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                res.status(400).json({
                    message: `Brand with ID ${brandId} is not exist`
                })
            }
        }

        let categoryId = req.body.categoryId
        if(!categoryId){
            res.status(400).json({
                message: "category ID is required"
            })
        }else{
            let category = await Category.findOne({category_id: categoryId})
            if(!category){
                res.status(400).json({
                    message: `Category with ID ${categoryId} is not exist`
                })
            }
        }
        let productCount = Product.countDocuments()
        let productId = categoryId + brandId + (productCount + 1)
        let product = new Product({
            product_id: productId,
            category_id: categoryId,
            brand_id: brandId
        })
        let productName = req.body.productName
        if(!productName){
            res.status(400).json({
                message: "Product name is required"
            })
        }
        let productDescription = req.body.productDescription
        if(!productDescription){
            res.status(400).json({
                message: "Product description is required"
            })
        }
        let cpuBrand = req.body.cpuBrand
        if(!cpuBrand){
            res.status(400).json({
                message: "Cpu brand is required"
            })
        }
        let size = req.body.size
        if(!size){
            res.status(400).json({
                message: "Product size is required"
            })
        }
        let featureImgSrc = req.body.featureImgSrc
        if(!featureImgSrc){
            res.status(400).json({
                message: "Product feature img is required"
            })
        }
        let save;
        switch (categoryId) {
            case "LT":
                let vgaBrand = req.body.vgaBrand
                if(!vgaBrand){
                    res.status(400).json({
                        message: "Vga brand is required"
                    })
                }
                let laptop = new Laptop({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    vga_brand: vgaBrand,
                    size: size,
                    feature_img_src: featureImgSrc
                })
                save = await laptop.save();
                break;
            case "CP":
                let os = req.body.os
                if(!os){
                    res.status(400).json({
                        message: "OS name is required"
                    })
                }
                let cellphone = new Cellphone({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    os: os,
                    size: size,
                    feature_img_src: featureImgSrc
                })
                save = await cellphone.save()
                break;
            default:
                res.status(400).json({
                    message: `Invalid category ID`
                })
                break;
        }
        if(save){
            await product.save()
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const addLaptop = async (req, res, next) => {
    try {
        let brandId = req.body.brandId
        if(!brandId){
            res.status(400).json({
                message: "brand ID is required"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                res.status(400).json({
                    message: `Brand with ID ${brandId} is not exist`
                })
            }
        }
        let productName = req.body.productName
        if(!productName){
            res.status(400).json({
                message: "Product name is required"
            })
        }
        let productDescription = req.body.productDescription
        if(!productDescription){
            res.status(400).json({
                message: "Product description is required"
            })
        }
        let cpuBrand = req.body.cpuBrand
        if(!cpuBrand){
            res.status(400).json({
                message: "Cpu brand is required"
            })
        }
        let vgaBrand = req.body.vgaBrand
        if(!vgaBrand){
            res.status(400).json({
                message: "Vga brand is required"
            })
        }
        let size = req.body.size
        if(!size){
            res.status(400).json({
                message: "Product size is required"
            })
        }
        let featureImgSrc = req.body.featureImgSrc
        if(!featureImgSrc){
            res.status(400).json({
                message: "Product feature img is required"
            })
        }
        let productCount = Product.countDocuments()
        let productId = "LT" + brandId + (productCount + 1)
        const laptop = new Laptop({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    vga_brand: vgaBrand,
                    size: size,
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
                res.status(200).json({
                    message: `Laptop added`,
                    laptop: laptop,
                    product: product
                })
            }else{
                //Rollback on laptop save
                await Laptop.remove({product_id: productId})
                res.status(400).json({
                message: "Product save failed!"
                })
            }
        }else{
            res.status(400).json({
                message: "Laptop save failed!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const addCellphone = async (req, res, next) => {
    try {
        let brandId = req.body.brandId
        if(!brandId){
            res.status(400).json({
                message: "brand ID is required"
            })
        }else{
            let brand = await Brand.findOne({brand_id: brandId})
            if(!brand){
                res.status(400).json({
                    message: `Brand with ID ${brandId} is not exist`
                })
            }
        }
        let productName = req.body.productName
        if(!productName){
            res.status(400).json({
                message: "Product name is required"
            })
        }
        let productDescription = req.body.productDescription
        if(!productDescription){
            res.status(400).json({
                message: "Product description is required"
            })
        }
        let cpuBrand = req.body.cpuBrand
        if(!cpuBrand){
            res.status(400).json({
                message: "Cpu brand is required"
            })
        }
        let os = req.body.os
        if(!os){
            res.status(400).json({
                message: "os is required"
            })
        }
        let size = req.body.size
        if(!size){
            res.status(400).json({
                message: "Product size is required"
            })
        }
        let featureImgSrc = req.body.featureImgSrc
        if(!featureImgSrc){
            res.status(400).json({
                message: "Product feature img is required"
            })
        }
        let productCount = Product.countDocuments()
        let productId = "CP" + brandId + (productCount + 1)
        const cellphone = new Cellphone({
                    product_id: productId,
                    brand_id: brandId,
                    product_name: productName,
                    description: productDescription,
                    cpu_brand: cpuBrand,
                    os: os,
                    size: size,
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
                res.status(200).json({
                    message: `Cellphone added`,
                    cellphone: cellphone,
                    product: product
                })
            }else{
                //rollback cellphone added
                await Cellphone.remove({product_id: productId})
                res.status(400).json({
                message: "Product save failed!"
                })
            }
        }else{
            res.status(400).json({
                message: "Cellphone save failed!"
            })
        }
    } catch (error) {
        res.status(500).json({
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