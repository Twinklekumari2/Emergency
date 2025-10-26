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
    }
})

const Hospital = mongoose.model('hospital', hospitalSchema);
module.exports = Hospital