const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, required: true, trim: true },
    registrationNo: { type: String, required: true, unique: true, index: true },
    hospitalType: { type: String, required: true },
    ownership: { type: String },
    establishedYear: { type: String },

    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true, index: true }, // Indexed for city-wide routing filters
    district: { type: String },
    pincode: { type: String },
    state: { type: String, index: true }, // Indexed for state filter paths

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
    },

    officialEmail: { type: String, required: true, unique: true, lowercase: true, trim: true },
    officialPhone: { type: String },
    emergencyPhone: { type: String },
    website: { type: String },

    totalBeds: { type: Number, default: 0 },
    icuBeds: { type: Number, default: 0 },
    oxygenBeds: { type: Number, default: 0 },
    ventilators: { type: Number, default: 0 },
    ambulanceCount: { type: Number, default: 0 },
    is24X7: { type: Boolean, default: true }, 
    departments: { type: String },

    isAcceptingEmergency: { type: Boolean, default: true, index: true }, 
    availableBeds: { type: Number, default: 0 },
    availableAmbulances: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },

    hospitalLicenseUrl: { type: String },
    aadhaarOrPanUrl: { type: String },
    fireSafetyCertificate: { type: String },
    imageOfHospital: { type: String },

    adminName: { type: String },
    adminRole: { type: String },
    adminPhone: { type: String },
    adminEmail: { type: String, lowercase: true, trim: true },
    adminPassword: { type: String },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
      index: true
    },
  },
  { timestamps: true }
);

hospitalSchema.index({ location: "2dsphere" });

hospitalSchema.pre('save', async function(next) {
    if (!this.isModified('adminPassword')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.adminPassword = await bcrypt.hash(this.adminPassword, salt);
        next();
    } catch (err) {
        next(err);
    }
});

hospitalSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.adminPassword);
};

module.exports = mongoose.model("Hospital", hospitalSchema);