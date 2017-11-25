const express = require('express');
const Tracker = require('../models/tracker.model');

const router = express.Router();

router.get('/status/:id', (req, res) => {
  res.json({
    currentZone: Math.round(Math.random() * 4),
    lastUpdate: Date.now(),
  });
});

router.post('/new', (req, res) => {
  const newTracker = new Tracker();
  newTracker.trackingId = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 6)
    .toUpperCase();
  newTracker.flightId = 'FF 5560';
  newTracker.userId = '5a19826fbd00af3463d41589';
  newTracker.save((err, t) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.status(201).json({ trackerId: t.trackingId });
    }
  });
});

module.exports = router;

