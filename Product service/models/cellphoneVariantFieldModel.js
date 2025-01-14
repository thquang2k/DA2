const mongoose = require("mongoose")

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
    origin: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    color: {
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
    whd_size: [{
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
    }],
    screen: [{
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
    }],
    cpu: [{
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
    }],
    connectors: [{
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
    }],
    storage: [{
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
    }],
    camera: [{
        back_camera: {
            type: [cameraSchema]
        },
        front_camera: {
            type: cameraSchema
        }
    }],
    power: [{
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
    }],
    gears: {
        type: [gearSchema]
    }
})

const cellphoneVariantFieldModel = mongoose.model("Cellphone_Variant_Field", cellphoneVariantFieldSchema)

module.exports = cellphoneVariantFieldModel