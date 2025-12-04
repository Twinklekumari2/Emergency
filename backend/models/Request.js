const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    hospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
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
        type:String,
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


const Request = mongoose.model('request', requestSchema);
module.exports = Request;