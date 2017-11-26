const express = require('express');
const Tracker = require('../models/tracker.model');
const TrackerZone = require('../models/tracker-zone.model');
const Zone = require('../models/zone.model');

const router = express.Router();

router.get('/status/:id', (req, res) => {
  console.log(req.params.id);
  TrackerZone.find({
    trackerId: req.params.id,
  }).sort('-arrival')
    .exec((err, currentZoneTrack) => {
      console.log(currentZoneTrack);
      const jsonResponse = {
        currentZone: currentZoneTrack.zoneName,
        lastUpdate: currentZoneTrack.arrival,
        estimatedArrival: currentZoneTrack.arrival,
      };

      Zone.find((error, zones) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          zones.sort((a, b) => b.order > a.order);
          const zoneOrderPosition = zones.filter(zone => zone.name === currentZoneTrack.name);
          const zonesToPass = zones.filter(zone => zone.order >= zoneOrderPosition);
          zonesToPass.forEach((zone) => {
            jsonResponse.estimatedDuration += zone.estimatedDuration;
          });
          res.json(jsonResponse);
        }
      });
    });

  /* res.json({
    currentZone: Math.round(Math.random() * 4),
    lastUpdate: Date.now(),
    estimatedArrival: Date.now() + Math.round(Math.random() * 3600),
  }); */
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

router.post('/', (req, res) => {
  const trackingId = req.body.id;
  const zoneName = req.body.zoneName;

  if (trackingId && trackingId !== ''
    && zoneName && zoneName !== '') {
    const newTrackerZone = new TrackerZone();
    newTrackerZone.trackerId = trackingId;
    newTrackerZone.zoneName = zoneName;
    newTrackerZone.arrival = Date.now();
    newTrackerZone.save((err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  }
});

module.exports = router;

