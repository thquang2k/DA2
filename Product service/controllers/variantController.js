const Laptop = require('../models/laptopModel')
const Cellphone = require('../models/cellphoneModel')
const LaptopVariant = require('../models/laptopVariantModel')
const CellphoneVariant = require('../models/cellphoneVariantModel')
const LaptopVariantField = require('../models/laptopVariantFieldModel')
const CellphoneVariantField = require('../models/cellphoneVariantFieldModel')

const getAllLaptopVariantsByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(!laptop){
                return res.status(400).json({
                    success: false,
                    message: `Laptop with ID ${productId} is not exist`
                })
            }else{
                let variants = await LaptopVariant.find({product_id: productId})
                if(!variants){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot get Laptop with ID ${productId}!`
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: `Get all variants of laptop with ID ${productId} succeeded!`,
                        variants: variants
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const getAllCellphoneVariantsByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(!cellphone){
                return res.status(400).json({
                    success: false,
                    message: `Cellphone with ID ${productId} is not exist`
                })
            }else{
                let variants = await CellphoneVariant.find({product_id: productId})
                if(!variants){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot get Cellphone with ID ${productId}!`
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: `Get all variants of laptop with ID ${productId} succeeded!`,
                        variants: variants
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const getLaptopVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            res.status(400).json({
                message: "Variant ID is required"
            })
        }else{
            let variant = await LaptopVariant.find({variant_id: variantId})
            if(!variant){
                res.status(400).json({
                    message: `Laptop variant with ID ${variantId} is not exist!`
                })
            }else{
                res.status(200).json({
                    message: `Get laptop variant with ID ${productId} succeeded!`,
                    variant: variant
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const getCellphoneVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            res.status(400).json({
                message: "Variant ID is required"
            })
        }else{
            let variant = await CellphoneVariant.find({variant_id: variantId})
            if(!variant){
                res.status(400).json({
                    message: `Cellphone variant with ID ${variantId} is not exist!`
                })
            }else{
                res.status(200).json({
                    message: `Get cellphone variant with ID ${productId} succeeded!`,
                    variant: variant
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const createLaptopVariant = async (req, res, next) => {
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
                //Variant info
                let variantName = req.body.variant.name
                if(!variantName){
                    res.status(400).json({
                        message: "Variant Name is required!"
                    })
                }
                let price = req.body.variant.price
                if(!price){
                    res.status(400).json({
                        message: "Price is required!"
                    })
                }
                let promotionId = req.body.variant.promotionId
                if(!promotionId){
                    promotionId = "None";
                }
                let stock = req.body.variant.stock
                if(!stock){
                    stock = 0
                }
                let variantId = await LaptopVariant.countDocuments({product_id: productId})
                variantId = productId + "V" + variantId.toString()
                //Field info
                
                let partNumber = req.body.variantField.partNumber
                if(!partNumber){
                    res.status(400).json({
                        message: "Part Number is required!"
                    })
                }
                let mfgYear = req.body.variantField.mfgYear
                if(!mfgYear){
                    res.status(400).json({
                        message: "MFG Year is required!"
                    })
                }
                let originId = req.body.variantField.originId
                if(!originId){
                    res.status(400).json({
                        message: "Origin ID is required!"
                    })
                }
                let weight = req.body.variantField.weight
                if(!weight){
                    res.status(400).json({
                        message: "Weight is required!"
                    })
                }
                let colorId = req.body.variantField.colorId
                if(!color){
                    res.status(400).json({
                        message: "Color ID is required!"
                    })
                }
                let material = req.body.variantField.material
                if(!material){
                    res.status(400).json({
                        message: "Material is required!"
                    })
                }
                let maxRamUp = req.body.variantField.maxRamUp
                if(!maxRamUp){
                    maxRamUp = "Cannot Upgrade"
                }
                let maxDriveUp = req.body.variantField.maxDriveUp
                if(!maxDriveUp){
                    maxDriveUp = "Cannot Upgrade"
                }
                let whdSize = {
                    width : req.body.variantField.whdSize.width,
                    height: req.body.variantField.whdSize.height,
                    depth: req.body.variantField.whdSize.depth
                }
                if(!whdSize.width || !whdSize.height || ! whdSize.depth){
                    res.status(400).json({
                        message: "Width, Height, Depth is all required!"
                    })
                }
                let cpu = {
                    brand: req.body.variantField.cpu.brand,
                    name: req.body.variantField.cpu.name,
                    model: req.body.variantField.cpu.model,
                    minRate: req.body.variantField.cpu.minRate
                }
                if(!cpu.brand || !cpu.name || !cpu.model || !cpu.minRate){
                    res.status(400).json({
                        message: "CPU Brand, Name, Model, Min rate is all required!"
                    })
                }
                let vga = {
                    brand: req.body.variantField.vga.brand,
                    name: req.body.variantField.vga.name,
                    model: req.body.variantField.vga.model
                }
                if(!vga.brand || !vga.name || !vga.model){
                    res.status(400).json({
                        message: "VGA Brand, Name, Model is all required!"
                    })
                }
                let ram = {
                    type: req.body.variantField.ram.type,
                    storage: req.body.variantField.ram.storage,
                    slots: req.body.variantField.ram.slots
                }
                if(!ram.type || !cpu.storage || !ram.slots){
                    res.status(400).json({
                        message: "RAM Type, Storage, Slots is all required!"
                    })
                }
                let drive = {
                    type: req.body.variantField.drive.type,
                    model: req.body.variantField.drive.model,
                    storage: req.body.variantField.drive.storage,
                    slots: req.body.variantField.drive.slots
                }
                if(!drive.type || !drive.model || !drive.storage || !drive.slots){
                    res.status(400).json({
                        message: "Drive Type, Model, Storage, Slots is all required!"
                    })
                }
                let screen = {
                    size: req.body.variantField.screen.size,
                    type: req.body.variantField.screen.type,
                    resolution: {
                        width: req.body.variantField.screen.resolution.width,
                        height: req.body.variantField.screen.resolution.height
                    },
                    refreshRate: req.body.variantField.screen.refreshRate,
                    colorRate: req.body.variantField.screen.colorRate,
                    ratio: req.body.variantField.screen.ratio
                }
                if(!screen.size || !screen.type || !screen.resolution.width || !screen.resolution.height || !screen.refreshRate || !screen.colorRate || !screen.ratio){
                    res.status(400).json({
                        message: "Screen Size, Type, Resolution, Refresh Rate, Color rate, Ratio is all required!"
                    })
                }
                let port = {
                    wifi: req.body.variantField.port.wifi,
                    bluetooth: req.body.variantField.port.bluetooth,
                    webcam: req.body.variantField.port.webcam,
                    usb1: {
                        type: req.body.variantField.port.usb1.type,
                        slots: req.body.variantField.port.usb1.slots
                    },
                    usb2: {
                        type: req.body.variantField.port.usb2.type,
                        slots: req.body.variantField.port.usb2.slots
                    },
                    hdmi1: {
                        version: req.body.variantField.port.hdmi1.version,
                        slots: req.body.variantField.port.hdmi1.slots
                    },
                    hdmi2: {
                        version: req.body.variantField.port.hdmi2.version,
                        slots: req.body.variantField.port.hdmi2.slots
                    },
                    cardReaderSlots: req.body.variantField.port.cardReaderSlots,
                    jack3p5mmSlots: req.body.variantField.port.jack3p5mmSlots
                }
                if(!port.wifi || !port.bluetooth || !port.usb1.type || !port.usb1.slots || !port.hdmi1.version || !port.hdmi1.slots){
                    res.status(400).json({
                        message: "Wifi, Bluetooth, USB Port, HDMI Port is all required!"
                    })
                }else{
                    if(!port.webcam){
                        port.webcam = "None"
                    }
                    if(!port.usb2.type || !port.usb2.slots){
                        port.usb2 = null
                    }
                    if(!port.hdmi2.version || !port.hdmi2.slots){
                        port.hdm2 = null
                    }
                    if(!port.cardReaderSlots){
                        port.cardReaderSlots = 0
                    }
                    if(!port.jack3p5mmSlots){
                        port.jack3p5mmSlots = 0
                    }
                }
                let os = {
                    name: req.body.variantField.os.name,
                    version: req.body.variantField.os.version
                }
                if(!os.name || !os.version){
                    res.status(400).json({
                        message: "OS Name, Version is all required!"
                    })
                }
                let keyboard = {
                    type: req.body.variantField.keyboard.type,
                    led: req.body.variantField.keyboard.led,
                    hasNumpad: req.body.variantField.keyboard.hasNumpad,
                    touchpad: req.body.variantField.keyboard.touchpad
                }
                if(!keyboard.type || !keyboard.hasNumpad || !keyboard.touchpad){
                    res.status(400).json({
                        message: "Keyboard Type, Has Numpad, Touchpad is all required!"
                    })
                }else{
                    if(!keyboard.led){
                        keyboard.led = "None"
                    }
                }
                let power = {
                    capability: req.body.variantField.power.capability,
                    supply: req.body.variantField.power.supply
                }
                if(!power.capability || !power.supply){
                    res.status(400).json({
                        message: "Power capability, supply is all required!"
                    })
                }
                let sku = "L" + originId + "Y" + mfgYear.toString() + "C" + colorId
                let variantFieldId = variantId + "FIELD"
                
                let variant = new LaptopVariant({
                    variant_id: variantId,
                    product_id: productId,
                    variant_name: variantName,
                    sku: sku,
                    price: price,
                    promotion_id: promotionId,
                    stock: stock
                })

                let variantField = new LaptopVariantField({
                    variant_field_id: variantFieldId,
                    variant_id: variantId,
                    part_number: partNumber,
                    mfg_year: mfgYear,
                    origin_id: originId,
                    weight: weight,
                    color_id: colorId,
                    material: material,
                    max_ram_up: maxRamUp,
                    max_drive_up: maxDriveUp,
                    whd_size: whdSize,
                    cpu: cpu,
                    vga: vga,
                    ram: ram,
                    drive: drive,
                    screen: screen,
                    port: port,
                    os: os,
                    power: power,
                    gears: gears
                })

                let fieldSave = await variantField.save()
                if(!fieldSave){
                    res.status(400).json({
                        message: "Cannot save laptop variant field"
                    })
                }else{
                    let variantSave = await variant.save()
                    if(!variantSave){
                        await LaptopVariantField.findOneAndDelete({variant_field_id: variantFieldId})
                        res.status(400).json({
                            message: "Cannot save laptop variant"
                        })
                    }else{
                        res.status(200).json({
                            message: "Save laptop variant succeeded",
                            variant: variant,
                            fields: variantField
                        })
                    }
                }
            }
        }
        
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const createCellphoneVariant = async (req, res, next) => {
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
                //Variant info
                let variantName = req.body.variant.name
                if(!variantName){
                    res.status(400).json({
                        message: "Variant Name is required!"
                    })
                }
                let price = req.body.variant.price
                if(!price){
                    res.status(400).json({
                        message: "Price is required!"
                    })
                }
                let promotionId = req.body.variant.promotionId
                if(!promotionId){
                    promotionId = "None";
                }
                let stock = req.body.variant.stock
                if(!stock){
                    stock = 0
                }
                let variantId = await CellphoneVariant.countDocuments({product_id: productId})
                variantId = productId + "V" + variantId.toString()
                //Field info
                let mfgYear = req.body.variantField.mfgYear
                if(!mfgYear){
                    res.status(400).json({
                        message: "MFG Year is required!"
                    })
                }
                let originId = req.body.variantField.originId
                if(!originId){
                    res.status(400).json({
                        message: "Origin ID is required!"
                    })
                }
                let weight = req.body.variantField.weight
                if(!weight){
                    res.status(400).json({
                        message: "Weight is required!"
                    })
                }
                let colorId = req.body.variantField.colorId
                if(!color){
                    res.status(400).json({
                        message: "Color ID is required!"
                    })
                }
                let material = req.body.variantField.material
                if(!material){
                    res.status(400).json({
                        message: "Material is required!"
                    })
                }
                let waterResist = req.body.variantField.waterResist
                if(!waterResist){
                    waterResist = "None"
                }
                let ramStorage = req.body.variantField.ramStorage
                if(!ramStorage){
                    res.status(400).json({
                        message: "RAM storage is required!"
                    })
                }
                let gpu = req.body.variantField.gpu
                if(!gpu){
                    gpu = "None"
                }
                let whdSize = {
                    width : req.body.variantField.whdSize.width,
                    height: req.body.variantField.whdSize.height,
                    depth: req.body.variantField.whdSize.depth
                }
                if(!whdSize.width || !whdSize.height || ! whdSize.depth){
                    res.status(400).json({
                        message: "Width, Height, Depth is all required!"
                    })
                }
                let cpu = {
                    version: req.body.variantField.cpu.version,
                    name: req.body.variantField.cpu.name,
                    processorNum: req.body.variantField.cpu.processorNum,
                    maxRate: req.body.variantField.cpu.maxRate
                }
                if(!cpu.version || !cpu.name || !cpu.processorNum || !cpu.maxRate){
                    res.status(400).json({
                        message: "CPU Version, Name, Number of processors, Max rate is all required!"
                    })
                }
                let connectors = {
                    wifi: req.body.variantField.connectors.wifi,
                    bluetooth: req.body.variantField.connectors.bluetooth,
                    sim: [],
                    internet: req.body.variantField.connectors.internet,
                    chargerType: req.body.variantField.connectors.chargerType,
                    hasJack3p5mm: req.body.variantField.connectors.hasJack3p5mm,
                    gpsSupport: []
                }
                if(!req.body.variantField.connectors.sim || !connectors.chargerType){
                    res.status(400).json({
                        message: "Connector SIM, Charger Type is all required!"
                    })
                }else{
                    if(!connectors.hasJack3p5mm){
                        connectors.hasJack3p5mm = false;
                    }
                    if(!connectors.wifi){
                        connectors.wifi = "Not available"
                    }
                    if(!connectors.bluetooth){
                        connectors.bluetooth = "Not available"
                    }
                    if(!connectors.internet){
                        connectors.internet = "Not supported"
                    }
                    if(req.body.variantField.connectors.sim){
                        req.body.variantField.connectors.sim.forEach(sim => {
                            connectors.gpsSupport.push(sim)
                        });
                    }
                    if(!req.body.variantField.connectors.gpsSupport){
                        connectors.gpsSupport = "Not supported"
                    }else{
                        req.body.variantField.connectors.gpsSupport.forEach(gps => {
                            connectors.gpsSupport.push(gps)
                        });
                    }
                }
                let storage = {
                    rom: req.body.variantField.storage.rom,
                    driveSupport: req.body.variantField.storage.driveSupport,
                    maxDriveSupport: req.body.variantField.storage.maxDriveSupport
                }
                if(!storage.rom){
                    res.status(400).json({
                        message: "Storage ROM is required!"
                    })
                }else{
                    if(!storage.driveSupport){
                        storage.driveSupport = "Not support"
                        storage.driveSupport.maxDriveSupport = 0
                    }else{
                        if(!storage.maxDriveSupport){
                            res.status(400).json({
                                message: "Storage Max drive support is required!"
                            })
                        }
                    }
                }

                let cameras = {
                    backCamera: [],
                    frontCamera: {
                        type: req.body.variantField.cameras.frontCamera.type,
                        resolution: req.body.variantField.cameras.frontCamera.resolution,
                        videoResolution: req.body.cameras.frontCamera.videoResolution
                    }
                }
                if(!req.body.variantField.cameras.backCamera){
                    cameras.backCamera = "None"
                }
                if(!cameras.frontCamera.type || !cameras.frontCamera.resolution || !cameras.frontCamera.videoResolution){
                    cameras.frontCamera = "None"
                }
                if(!drive.type || !drive.model || !drive.storage || !drive.slots){
                    res.status(400).json({
                        message: "Drive Type, Model, Storage, Slots is all required!"
                    })
                }
                let screen = {
                    size: req.body.variantField.screen.size,
                    type: req.body.variantField.screen.type,
                    resolution: {
                        width: req.body.variantField.screen.resolution.width,
                        height: req.body.variantField.screen.resolution.height
                    },
                    refreshRate: req.body.variantField.screen.refreshRate,
                    brightRate: req.body.variantField.screen.brightRate,
                    touchRate: req.body.variantField.screen.touchRate,
                    material: req.body.variantField.screen.material
                }
                if(!screen.size || !screen.type || !screen.resolution.width || !screen.resolution.height || !screen.refreshRate || !screen.brightRate || !screen.material){
                    res.status(400).json({
                        message: "Screen Size, Type, Resolution, Refresh Rate, Bright rate, Material is all required!"
                    })
                }else{
                    if(!screen.touchRate){
                        screen.touchRate = "Not available"
                    }
                }
                let power = {
                    batteryType: req.body.variantField.power.batteryType,
                    capability: req.body.variantField.power.capability,
                    charger: req.body.variantField.power.charger
                }
                if(!power.batteryType || !power.capability || !power.charger){
                    res.status(400).json({
                        message: "Power battery type, capility, charger is all required!"
                    })
                }
                
                let sku = "C" + originId + "R" + storage.rom + "C" + colorId
                let variantFieldId = variantId + "FIELD"
                
                let variant = new CellphoneVariant({
                    variant_id: variantId,
                    product_id: productId,
                    variant_name: variantName,
                    sku: sku,
                    price: price,
                    promotion_id: promotionId,
                    stock: stock
                })

                let variantField = new CellphoneVariantField({
                    variant_field_id: variantFieldId,
                    variant_id: variantId,
                    mfg_year: mfgYear,
                    origin_id: originId,
                    weight: weight,
                    color_id: colorId,
                    water_resist: waterResist,
                    material: material,
                    ram_storage: ramStorage,
                    gpu: gpu,
                    whd_size: whdSize,
                    screen: screen,
                    cpu: cpu,
                    connectors: connectors,
                    storage: storage,
                    camera: cameras,
                    screen: screen,
                    power: power,
                    gears: gears
                })

                let fieldSave = await variantField.save()
                if(!fieldSave){
                    res.status(400).json({
                        message: "Cannot save cellphone variant field"
                    })
                }else{
                    let variantSave = await variant.save()
                    if(!variantSave){
                        await CellphoneVariantField.findOneAndDelete({variant_field_id: variantFieldId})
                        res.status(400).json({
                            message: "Cannot save cellphone variant"
                        })
                    }else{
                        res.status(200).json({
                            message: "Save cellphone variant succeeded",
                            variant: variant,
                            fields: variantField
                        })
                    }
                }
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
    getAllLaptopVariantsByProductId,
    getLaptopVariantById,
    getCellphoneVariantById,
    createLaptopVariant,
    createCellphoneVariant
}