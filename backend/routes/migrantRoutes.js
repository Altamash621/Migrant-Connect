const educationController = require('../controllers/educationController');
const express = require('express');
const router = express.Router();
const Migrant = require('../models/Migrant');
const jwt = require('jsonwebtoken');

// Secret key for JWT (in production, move to .env)
const JWT_SECRET = 'my-secret-key';

// REGISTER
router.post('/register', async (req, res) => {
  const data = req.body;
  const migrantId = 'MID-' + Math.floor(100000 + Math.random() * 900000);
  const newMigrant = new Migrant({ ...data, migrantId });

  try {
    const saved = await newMigrant.save();
    res.json({ access_token: saved.migrantId, migrant: saved }); // <-- updated response
  } catch (err) {
    res.status(500).json({ error: 'Failed to register' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { migrantId } = req.body;
  const migrant = await Migrant.findOne({ migrantId });
  if (!migrant) return res.status(401).json({ error: 'Invalid Migrant ID' });
  res.json({ access_token: migrant.migrantId, migrant });
});

// Get migrant by migrantId (simulate access token)
router.get('/:migrantId', async (req, res) => {
  try {
    const migrant = await Migrant.findOne({ migrantId: req.params.migrantId });
    if (!migrant) return res.status(404).json({ error: 'Not found' });

    // Convert fileData buffer to base64 for each education entry
    const migrantObj = migrant.toObject();
    migrantObj.education = migrantObj.education.map(edu => ({
      ...edu,
      marksCard: edu.marksCard && edu.marksCard.fileData
        ? {
            ...edu.marksCard,
            fileData: edu.marksCard.fileData.toString('base64')
          }
        : edu.marksCard
    }));

    res.json(migrantObj);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add education record
router.post('/:migrantId/education', async (req, res) => {
  const newEducation = {
    institution: req.body.institution,
    state: req.body.state,
    degree: req.body.degree,
    year: req.body.year,
    details: req.body.details,
    marksCard: req.body.marksCard,
    source: req.body.source || 'user',
    status: req.body.status || 'User Added'
  };

  try {
    const migrant = await Migrant.findOneAndUpdate(
      { migrantId: req.params.migrantId },
      { $push: { education: newEducation } },
      { new: true }
    );
    res.status(201).json({ message: 'Education record added.', migrant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
