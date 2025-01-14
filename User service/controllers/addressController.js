const Address = require("../models/addressModel")
const User = require("../models/userModel")

const getAllAddress = async (req, res, next) => {
    try {
        let addressList = await Address.find()
        if(!addressList){
            res.status(400).json({
                message: "Cannot find address"
            })
        }else{
            res.status(500).json({
                message: `Error: ${error.message}`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAddressByUserId = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if(!userId){
            res.status(400).json({
                message: `user ID is required`
            })
        }else{
            let user = User.findOne({user_id:userId})
            if(!user){
                res.status(400).json({
                    message: `Cannot find user with ID ${userId}`
                })
            }else{
                let addressList = await Address.find({user_id: user.user_id})
                res.status(200).json({
                    message: `Address of user ID ${userId}`,
                    address: addressList
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const getAddressById = async (req, res, next) => {
    try {
        let addressId = req.params.addressId
        if(addressId){
            res.status(400).json({
                message: `Address ID is required`
            })
        }else{
            let address = Address.findOne({address_id:addressId})
            if(!address){
                res.status(400).json({
                    message: `Cannot find user with ID ${addressId}`
                })
            }else{
                res.status(200).json({
                    message: `Address ID ${addressId}`,
                    address: address
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const createAddress = async (req,res,next) => {
    try {
        let userId = req.params.userId
        let user = User.findOne({user_id:userId})
        if(!user){
            res.status(400).json({
                message: `Cannot find user with ID ${userId}`
            })
        }else{
            let city = req.body.city
            if(!city){
                res.status(400).json({
                    message: "City is required"
                })
            }
            let district = req.body.district
            if(!district){
                res.status(400).json({
                    message: "District is required"
                })
            }
            let avenue = req.body.avenue
            if(!avenue){
                res.status(400).json({
                    message: "Avenue is required"
                })
            }
            let specific = req.body.specific
            if(!specific){
                res.status(400).json({
                    message: "Specific address is required"
                })
            }
            let addressCount = await Address.countDocuments({ user_id: userId})
            let addressId = userId + "Address" + (addressCount + 1)
            let address = new Address({
                address_id: addressId,
                user_id: userId,
                city: city,
                district: district,
                avenue: avenue,
                specific: specific
            })

            let save = await address.save()
            if(save){
                res.status(200).json({
                    message: "Address saved!",
                    address: address
                })
            }else{
                res.status(400).json({
                    message: "Address save failed!"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const updateAddressById = async (req, res, next) =>{
    try {
        let addressId = req.params.addressId
        if(!addressId){
            res.status(400).json({
                message: "Address Id is required!"
            })
        }else{
            let address = Address.findOne({address_id: addressId})
            if(!address){
                res.status(400).json({
                    message: `Cannot find address with ID ${addressId}`
                })
            }else{
                let oldAddress = address
                let province = req.body.province
                if(province){
                    address.province = province
                }
                let district = req.body.district
                if(district){
                    address.district = district
                }
                let avenue = req.body.avenue
                if(avenue){
                    address.avenue = req.body.avenue
                }
                let specific = req.body.specific
                if(specific){
                    address.specific = specific
                }

                let save = await address.save()
                if(save){
                    res.status(200).json({
                        message: "Address updated!",
                        before: oldAddress,
                        after: address
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

const deleteAddressById = async (req, res, next) => {
    try {
        let addressId = req.params.addressId
    if(!addressId){
        res.status(400).json({
            message: "Address ID is required!"
        })
    }else{
        let address = await Address.findOne({address_id: addressId})
        if(!address){
            res.status(400).json({
                message: `Cannot find address with ID ${addressId}`
            })
        }else{
            let deleteAddress = await Address.deleteOne({address_id: addressId})
            if(deleteAddress){
                res.status(200).json({
                    message: `Deleted address with ID ${addressId}`
                })
            }else{
                res.status(400).json({
                    message: `Deleted address failed`
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
    getAllAddress,
    getAddressByUserId,
    getAddressById,
    createAddress,
    updateAddressById,
    deleteAddressById
}