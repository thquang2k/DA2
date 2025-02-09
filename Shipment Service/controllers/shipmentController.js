const Shipment = require('../models/shipmentModel')
const ShipmentDetail = require('../models/shipmentDetailModel')

const getAllShipment = async (req, res, next) => {
    try {
        let shipments = await Shipment.find()
        let shipmentList = []
        for (let i = 0; i < shipments.length; i++) {
            let detail = await ShipmentDetail.find({shipment_id: shipments[i].shipment_id})
            shipmentList.push({
                shipment: shipments[i],
                detail: detail
            })            
        }

        return res.status(200).json({
            success: true,
            message: "Get all shipments succeeded",
            list: shipmentList
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const getShipmentById = async (req, res, next) => {
    try {
        let shipmentId = req.params.shipmentId
        let shipment = await Shipment.findOne({shipment_id: shipmentId})
        if(!shipment){
            return res.status(400).json({
                success: false,
                message: `Cannot find shipment with ID ${shipmentId}`
            })
        }
        let detail = await ShipmentDetail.find({shipment_id: shipment.shipment_id})

        return res.status(400).json({
            success: true,
            message: `Get shipment with ID ${shipmentId} succeeded`,
            shipment: shipment,
            detail: detail
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const createShipment = async (req, res, next) => {
    try {
        let orderId = req.body.orderId
        if(!orderId){
            return res.status(400).json({
                success: false,
                message: "Require order ID"
            })
        }
        
        let orderResponse = ""

        return res.status(200).json({
            success: true,
            message: "Create shipment succeeded"
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const updateShipmentById = async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const deleteShipmentById = async (req, res, next) => {
    try {
        let shipmentId = req.params.shipmentId
        let shipment = await Shipment.findOne({shipment_id: shipmentId})
        if(!shipment){
            return res.status(400).json({
                success: false,
                message: `Cannot find shipment with ID ${shipmentId}`
            })
        }

        await ShipmentDetail.deleteMany({shipment_id: shipmentId})
        return res.status(200).json({
            success: true,
            message: "Deleted shipment"
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllShipment,
    getShipmentById,
    createShipment,
    updateShipmentById,
    deleteShipmentById
}