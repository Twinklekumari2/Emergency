const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    location:{
        lat:{
            type:Number,
            required:true,
        },
        lon:{
            type:Number,
            required: true,
        },
    },
    ambulance:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ambulance"
    },
    icuAvailable:{
        type:Boolean,
        required: true,
        default: false,
    },
    ventilators:{
        type:Number,
        required:true,
        default:0,
    },
    ermergencyServices:{
        type:Boolean,
        required:true,
        default: true,
    },
    bedsAvailabe:{
        type:Boolean,
        required:true,
        default: 0,
    },
    lastUpdated:{
        type:Date,
        default: Date.now,
    }
})

const Hospital = mongoose.model('hospital', hospitalSchema);
module.exports = Hospital