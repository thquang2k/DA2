const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
    address_id: {
        type: String,
        required: true
    },
    total_item: {
        type: Number,
        default: 1
    },
    total_price: {
        type: Number,
        default: 0
    },
    delivery_cost: {
        type: Number,
        default: 0
    },
    coupon_id: {
        type: String
    },
    total_cost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Pending"
    }
})

const orderModel = mongoose.model("Order", orderSchema)

module.exports = orderModel