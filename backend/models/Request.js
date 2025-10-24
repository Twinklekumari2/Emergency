const mongoose = require('mongoose');
const User = require('./User');
const Hospital = require('./Hospital');

const requestSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User
    },
    hospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Hospital,
    },
    location:{
        lat:{
            type:Number,
        },
        lon:{
            type:Number,
        }
    },
    status:{
        enum:['pending', 'accepted', 'completed'],
        required:true,
    },
    driverInfo:{
        name:{
            type:String,
            required:true,
        },
        contact:{
            type:String,
            required:true,
        },
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})