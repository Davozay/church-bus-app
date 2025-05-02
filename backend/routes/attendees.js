const express = require('express');
const router = express.Router();
const Attendee = require('../models/Attendee');
const auth = require('../middleware/auth');

// Submit attendee form
router.post('/', async (req, res) => {
  try {
    const { name, phoneNumber, status, familyCount, churchBranch } = req.body;
    
    const attendee = new Attendee({
      name,
      phoneNumber,
      status,
      familyCount: status === 'family' ? familyCount : undefined,
      churchBranch
    });

    await attendee.save();
    res.status(201).json(attendee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendees by church branch (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const attendees = await Attendee.find({ churchBranch: req.user.churchBranch });
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;