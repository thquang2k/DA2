const mongoose = require("mongoose")

const whdSizeSchema = new mongoose.Schema({
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    }
})

const screenSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    screen_type: {
        type: String,
        required: true
    },
    resolution: [{
        width: Number,
        height: Number
    }],
    refresh_rate: {
        type: Number,
        required: true
    },
    bright_rate: {
        type: String,
        required: true
    },
    touch_rate: {
        type: String
    },
    material: {
        type: String,
        required: true
    }
})

const cpuSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    processor_num: {
        type: Number,
        required: true
    },
    max_rate: {
        type: Number,
        required: true
    }
})

const connectorsSchema = new mongoose.Schema({
    wifi: {
        type: String
    },
    bluetooth: {
        type: String
    },
    sim: [{
        sim_type: String,
        slots: Number
    }],
    internet: {
        type: String
    },
    charger_type: {
        type: String,
        required: true
    },
    has_jack3p5mm:{
        type: Boolean,
        required: true
    },
    gps_support: {
        type: [String]
    }
})

const storageSchema = new mongoose.Schema({
    rom: {
        type: Number,
        required: true
    },
    drive_support: {
        type: String
    },
    max_drive_support_size: {
        type: Number
    }
})

const cameraSchema = new mongoose.Schema({
    camera_type: {
        type: String
    },
    resolution: {
        type: Number
    },
    video_resolution:{
        type: Number
    }
})

const powerSchema = new mongoose.Schema({
    battery_type: {
        type: String,
        required: true
    },
    capability: {
        type: Number,
        required: true
    },
    charger: {
        type: String,
        required: true
    }
})

const gearSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

const cellphoneVariantFieldSchema = new mongoose.Schema({
    variant_field_id: {
        type: String,
        required: true,
        unique: true
    },
    mfg_year: {
        type: Number,
        required: true
    },
    origin_id: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    color_id: {
        type: String,
        required: true
    },
    water_resist: {
        type: String
    },
    material: {
        type: String,
        required: true
    },
    ram_storage: {
        type: Number,
        required: true
    },
    gpu: {
        type: String
    },
    whd_size: {
        type: whdSizeSchema,
        required: true
    },
    screen: {
        type: screenSchema,
        required: true
    },
    cpu: {
        type: cpuSchema,
        required: true
    },
    connectors: {
        type: connectorsSchema,
        required: true
    },
    storage: {
        type: storageSchema,
        required: true
    },
    camera: [{
        back_camera: {
            type: [cameraSchema]
        },
        front_camera: {
            type: cameraSchema
        }
    }],
    power: {
        type: powerSchema,
        required: true
    },
    gears: {
        type: [gearSchema]
    }
})

const cellphoneVariantFieldModel = mongoose.model("Cellphone_Variant_Field", cellphoneVariantFieldSchema)

module.exports = cellphoneVariantFieldModel