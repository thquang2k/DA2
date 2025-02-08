const axios = require('axios')

const Order = require('../models/orderModel')
const OrderDetail = require('../models/orderDetailModel')

const getAllOrder = async (req, res, next) => {
    try {
        let orders = await Order.find()
        if(!orders){
            return res.status(400).json({
                success: false,
                message: "Get all orders failed"
            })
        }

        let orderList = []
        for (let i = 0; i < orders.length; i++) {
            let detail = await OrderDetail.findOne({order_id: orders[i].order_id})
            if(!detail){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find order detail with order ID ${orders[i].order_id}`
                }) 
            }
            let orderItem = {
                order: order[i],
                detail: detail
            }
            orderList.push(orderItem)
        }

        return res.status(200).json({
            success: true,
            message: "Get all orders succeeded",
            orderList: orderList
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const createOrder = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        let config = {
            headers: {
                authorization: header
            }
          }
        let userData = await axios.get(`${process.env.USER_SERVICE_URL}/users/fetch`, config)
        if(!userData){
            return res.status(400).json({
                success: false,
                message: `Cannot fetch data user from user service`
            })
        }
        let user = userData.data.user
        if(!req.body.addressId){
            return res.status(400).json({
                success: false,
                message: `Address ID is required`
            })
        }
        let addressId = req.body.addressId
        let addressData = await axios.get(`${process.env.USER_SERVICE_URL}/addresses/get/${addressId}`)
        if(!addressData){
            return res.status(400).json({
                success: false,
                message: `Cannot get address from user service`
            })
        }
        let address = addressData.data.address

        let cartData = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/cart/`, config)
        if(!cartData){
            return res.status(400).json({
                success: false,
                message: `Cannot get cart from product service`
            })
        }
        let cart = cartData.data.cart
        let cartDetail = cartData.data.detail
        return res.status(200).json({
            success: true,
            message: `Fetch user data succedded`,
            user: userData.data.user
        })

    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}
module.exports = {
    getAllOrder,
    createOrder
}