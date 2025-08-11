const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/migrants', require('./routes/migrantRoutes'));

// Fallback route for unknown paths
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
// Middleware for institutional verification
const verifyAuth = (req, res, next) => {
  if (req.headers['x-api-key'] === process.env.VERIFIER_KEY) return next();
  return res.status(403).json({ error: 'Unauthorized institution' });
};

// Route to mark an education record as verified
app.post('/api/education/verify', verifyAuth, async (req, res) => {
  const { migrantId, institution, degree, year } = req.body;
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
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
