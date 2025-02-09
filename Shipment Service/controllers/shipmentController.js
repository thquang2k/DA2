const Shipment = require('../models/shipmentModel')
const ShipmentDetail = require('../models/shipmentDetailModel')

const getAllShipment = async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const getShipmentById = async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const createShipment = async (req, res, next) => {
    try {
        
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