const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    hospitalId:{
        type:String,
        required:true,
    },
    registrationNo:{
        type:String,
        required:true,
    },
    //  1️⃣ Patient Information
    relationshipToPatient: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },

    // 2️⃣ Contact Information
    contactName: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },

    // 3️⃣ Extra - track which admin submitted
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
    type: String,
    enum: ["Pending", "accepted", "completed"],
    default: "Pending"
}
})


const Request = mongoose.model('request', requestSchema);
module.exports = Request;