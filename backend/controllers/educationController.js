const Migrant = require('../models/Migrant');

// Add education record
exports.addEducation = async (req, res) => {
  const newEducation = {
    institution: req.body.institution,
    state: req.body.state,
    degree: req.body.degree,
    year: req.body.year,
    details: req.body.details,
    marksCard: req.body.marksCard,
    source: 'user',
    status: 'User Added'
  };

  await Migrant.findByIdAndUpdate(
    req.params.id,
    { $push: { education: newEducation } },
    { new: true }
  );
  res.status(201).json({ message: 'Education record added.' });
};



exports.verifyEducation = async (req, res) => {
  const { migrantId, institution, degree, year } = req.body;

  try {
    const user = await User.findOne({ migrantId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const edu = user.education.find(
      e => e.institution === institution && e.degree === degree && e.year === year
    );

    if (!edu) return res.status(404).json({ error: 'Education record not found' });

    edu.marksCard.status = 'Verified';
    edu.verifiedBy = institution;

    await user.save();

    res.json({ success: true, message: 'Education verified successfully', education: user.education });
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
