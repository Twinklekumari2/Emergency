const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    hospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
    },
    driverName:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['available','busy'],
        required:true,
    }
})

const Ambulance = mongoose.model('ambulance', ambulanceSchema);
module.exports = Ambulance; 