const mongoose = require('mongoose');

const migrantSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  dateOfBirth: String,
  gender: String,
  stateOfOrigin: String,
  currentState: String,
  languagePreference: String,
  migrantId: String,

  education: [{
    institution: String,
    state: String,
    degree: String,
    year: String,
    details: String,
    marksCard: {
      fileData: Buffer,
      fileType: String,
    },
    source: { type: String, enum: ['user', 'education_website'], default: 'user' },
    status: { type: String, enum: ['User Added', 'Verified'], default: 'User Added' }
  }],

  healthcare: [{
    visitDate: { type: String, required: true },
    facilityName: { type: String, required: true },
    diagnosis: { type: String },
    treatment: { type: String },
    doctorName: { type: String },
    state: { type: String }
  }]
});

module.exports = mongoose.model('Migrant', migrantSchema);
