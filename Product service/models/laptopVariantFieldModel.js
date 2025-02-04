const mongoose = require('mongoose')

const gearSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

const whdSizeSchema  = new mongoose.Schema({
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

const cpuSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    min_rate: {
        type: Number,
        required: true
    }
})

const vgaSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
})

const ramSchema = new mongoose.Schema({
    ram_type: {
        type: String,
        required: true 
    },
    storage: {
        type: String,
        required: true
    },
    slots: {
        type: Number,
        required: true
    }
})

const driveSchema = new mongoose.Schema({
    drive_type: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    slots: {
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
    color_rate: {
        type: String,
        required: true
    },
    ratio: {
        type: String,
        required: true
    }
})

const portSchema = new mongoose.Schema({
    wifi: {
        type: String,
        required: true
    },
    bluetooth: {
        type: String,
        required: true
    },
    webcam: {
        type: String
    },
    usb_1: [{
        usb_type: String,
        slots: Number
    }],
    usb_2: [{
        usb_type: String,
        slots: Number
    }],
    hdmi_1: [{
        version: String,
        slots: Number
    }],
    hdmi_2: [{
        version: String,
        slots: Number
    }],
    cardreader_slots: {
        type: Number
    },
    jack3p5mm_slots: {
        type: Number
    }
})

const osSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    }
})

const keyboardSchema = new mongoose.Schema({
    keyboard_type:{
        type: String,
        required: true
    },
    led: {
        type: String
    },
    has_numpad: {
        type: Boolean,
        required: true
    },
    touchpad: {
        type: String,
        required: true
    }
})

const powerSchema = new mongoose.Schema({
    capability: {
        type: Number,
        required: true
    },
    supply: {
        type: Number,
        required: true
    }
})

const laptopVariantFieldSchema = new mongoose.Schema({
    variant_field_id: {
        type: String,
        required: true,
        unique: true
    },
    variant_id: {
        type: String,
        required: true,
        unique: true
    },
    part_number: {
        type: String,
        required: true  
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
    material: {
        type: String,
        required: true
    },
    max_ram_up: {
        type: Number
    },
    max_drive_up: {
        type: Number
    },
    whd_size: {
        type: whdSizeSchema,
        required: true
    },
    cpu: {
        type: cpuSchema,
        required: true
    },
    vga: {
        type: vgaSchema,
        required: true
    },
    ram: {
        type: ramSchema,
        required: true
    },
    drive: {
        type: driveSchema,
        required: true
    },
    screen: {
        type: screenSchema,
        required: true
    },
    port: {
        type: portSchema,
        required: true
    },
    os:{
        type: osSchema,
        required: true
    },
    keyboard: {
        type: keyboardSchema,
        required: true
    },
    power: {
        type: powerSchema,
        required: true
    },
    gears: {
        type: [gearSchema]
    }

})

const laptopVariantFieldModel = mongoose.model("Laptop_Variant_Field", laptopVariantFieldSchema)

module.exports = laptopVariantFieldModel