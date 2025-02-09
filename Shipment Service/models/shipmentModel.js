const mongoose = require('mongoose')

const shipmentSchema  = new mongoose.Schema({
    shipment_id: {
        type: String,
        required: true,
        unique: true
    },
    order_id: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    avenue: {
        type: String,
        required: true
    },
    specific: {
        type: String,
        required: true
    },
    total_item: {
        type: Number,
        default: 0
    },
    retry: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true,
})

const shipmentModel = mongoose.model('Shipment', shipmentSchema)

module.exports = shipmentModel