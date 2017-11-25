const express = require('express');
const Tracker = require('../models/tracker.model');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(users);
    }
    return true;
  });
});

router.post('/new', (req, res) => {
  const newTracker = new Tracker();
  newTracker.trackingId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  newTracker.flightId = 'FF 5560';
  newTracker.userId = mongoose.Types.ObjectId('5a19826fbd00af3463d41589');
  newTracker.save((err, t) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.status(201).json({ trackerId: t._id });
    }
  });
});

module.exports = router;

