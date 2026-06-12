const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  assignedAmbulance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ambulance',
    default: null
  },
  assignedHospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    default: null,
    index: true
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  status: {
    type: String,
    enum: ['pending', 'searching', 'dispatched', 'accepted', 'completed', 'cancelled'],
    default: 'pending',
    index: true
  },
  bloodGroup: { type: String, default: null },
  notes: { type: String, default: "" },
  contactName: { type: String, default: null },
  contactPhone: { type: String, default: null },
  contactEmail: { type: String, default: null },
  relationshipToPatient: { type: String, default: null },
  registrationNo: { type: String, default: null, index: true },
  hospitalId: { type: String, default: null, index: true }
}, { timestamps: true });

requestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Request', requestSchema);