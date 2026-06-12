const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  deviceId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  name: { 
    type: String, 
    default: 'Anonymous Patient' 
  },
  phone: { 
    type: String, 
    default: null 
  },
  role: { 
    type: String, 
    default: 'patient' 
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  }
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('user', userSchema);