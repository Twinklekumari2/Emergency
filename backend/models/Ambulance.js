const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
        index: true // Fast filtering of an individual hospital's fleet
    },
    driverName: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'busy'],
        required: true,
        default: 'available',
        index: true // Fast filtering for emergency dispatch allocation
    }
});

module.exports = mongoose.model('ambulance', ambulanceSchema);