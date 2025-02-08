const Cart = require('../models/cartModel')
const CartDetail = require('../models/cartDetailModel')

const getCurrentUserCart = async (req, res, next) => {
    try {
        let user = req.user
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Not login"
            })
        }
        let cart = await Cart.findOne({user_id: userId})
        if(!cart){
            return res.status(400).json({
                success: false,
                message: `Cannot find cart with user ID ${userId}`
            })
        }

        let cartDetail
        if(cart){
            cartDetail = await CartDetail.findOne({cart_id: cart.cart_id})
        }
        return res.status(200).json({
            success: true,
            message: "Get cart succeeded",
            cart: cart,
            detail: cartDetail
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const createCart = async (req, res, next) => {
    try {
        let userId = req.body.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }else{
            let cart = new Cart({
                cart_id: "temp",
                user_id: userId
            })
            cart.cart_id = cart._id.toString()
            cart.cart_id.replace('new ObjectId(', '')
            cart.cart_id.replace(')', '')

            let save = await cart.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: "Cannot save cart"
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: "created cart",
                    cart: cart
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const removeCart = async (req, res, next) => {
    try {
        let userId = req.body.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }else{
            let cart = await Cart.findOne({user_id: userId})
            if(!cart){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find cart with user ID ${userId}`
                })
            }else{
                let cartDetail = await CartDetail.findOneAndDelete({cart_id: cart.cart_id})
                if(cartDetail){
                    let deleted = await Cart.findOneAndDelete({user_id: userId})
                    if(deleted){
                        return res.status(200).json({
                            success: true,
                            message: "deleted cart",
                        })
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Cannot delete cart"
                        })
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: "Cannot delete cart detail"
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

module.exports = {
    getCurrentUserCart,
    createCart,
    removeCart
}