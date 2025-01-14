const mongoose = require('mongoose')

const gearSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

const laptopVariantFieldSchema = new mongoose.Schema({
    variant_field_id: {
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
    cpu: [{
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
    }],
    vga: [{
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
    }],
    ram: [{
        ram_type: {
            type: String,
            required: true 
        },
        storage: {
            type: Number,
            required: true
        },
        slots: {
            type: Number,
            required: true
        }
    }],
    drive: [{
        drive_type: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        storage: {
            type: Number,
            required: true
        },
        slots: {
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
        color_rate: {
            type: String,
            required: true
        },
        ratio: {
            type: String,
            required: true
        }
    }],
    port: [{
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
        },
        os:[{
            name:{
                type: String,
                required: true
            },
            version: {
                type: String,
                required: true
            }
        }],
        keyboard: [{
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
        }]
    }],
    power: [{
        capability: {
            type: Number,
            required: true
        },
        supply: {
            type: Number,
            required: true
        }
    }],
    gears: {
        type: [gearSchema]
    }

})

const laptopVariantFieldModel = mongoose.model("Laptop_Variant_Field", laptopVariantFieldSchema)

module.exports = laptopVariantFieldModel