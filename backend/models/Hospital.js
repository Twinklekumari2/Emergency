const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const hospitalSchema = new mongoose.Schema(
  {
    // ============================
    // BASIC HOSPITAL INFO
    // ============================
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNo: {
      type: String,
      required: true,
      unique: true,
    },

    hospitalType: {
      type: String,
      required: true,
    },

    ownership: {
      type: String,
    },

    establishedYear: {
      type: String,
    },

    // ============================
    // ADDRESS
    // ============================
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    district: { type: String },
    pincode: { type: String },
    state: { type: String },

    // ============================
    // LOCATION
    // ============================
    latitude: { type: Number },
    longitude: { type: Number },

    // ============================
    // CONTACT INFO
    // ============================
    officialEmail: {
      type: String,
      required: true,
      unique: true,
    },

    officialPhone: {
      type: String,
    },

    emergencyPhone: {
      type: String,
    },

    website: {
      type: String,
    },

    // ============================
    // FACILITIES
    // ============================
    totalBeds: { type: Number, default: 0 },
    icuBeds: { type: Number, default: 0 },
    oxygenBeds: { type: Number, default: 0 },
    ventilators: { type: Number, default: 0 },
    ambulanceCount: { type: Number, default: 0 },
    is24X7: { type: String }, // you used string in state
    departments: { type: String },

    // ============================
    // LIVE AVAILABILITY
    // ============================
    isAcceptingEmergency: { type: String }, // string in state
    availableBeds: { type: Number, default: 0 },
    availableAmbulances: { type: Number, default: 0 },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    // ============================
    // DOCUMENTS
    // ============================
    hospitalLicenseUrl: { type: String },
    aadhaarOrPanUrl: { type: String },
    fireSafetyCertificate: { type: String },
    imageOfHospital: { type: String },

    // ============================
    // ADMIN INFO
    // ============================
    adminName: { type: String },
    adminRole: { type: String },
    adminPhone: { type: String },
    adminEmail: { type: String },
    adminPassword: { type: String },

    // ============================
    // VERIFICATION
    // ============================
    verificationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

hospitalSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('adminPassword')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.adminPassword, salt);
        user.adminPassword = hashedPassword;
        next();

    }catch(err){
        return next(err);
    }
})

hospitalSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.adminPassword)
        return isMatch;
        

    }catch(err){
        throw err;

    }

}

module.exports = mongoose.model("Hospital", hospitalSchema);
