const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['single', 'family'], 
    required: true 
  },
  familyCount: { 
    type: Number, 
    required: function() { return this.status === 'family'; } 
  },
  churchBranch: { type: String, required: true },
  scannedAt: { type: Date, default: Date.now },
  scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Attendee', attendeeSchema);