const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true
    },
    order_id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    phone_number: {
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
    discount_amount: {
        type: Number,
        default: 0
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