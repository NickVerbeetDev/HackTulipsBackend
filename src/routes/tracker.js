const express = require('express');
const path = require('path');
const Tracker = require('../models/tracker.model');
const TrackerZone = require('../models/tracker-zone.model');
const Zone = require('../models/zone.model');

const router = express.Router();

router.get('/:id', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(path.resolve('../../public/index.html'));
});

router.get('/status/:id', (req, res) => {
  TrackerZone.find({
    trackerId: req.params.id,
  }).sort('-arrival')
    .limit(1)
    .exec((err, currentZoneTrackArray) => {
      console.log(typeof currentZoneTrackArray);
      const currentZoneTrack = currentZoneTrackArray[0];
      console.log(currentZoneTrackArray);
      const jsonResponse = {
        currentZone: currentZoneTrack.zoneName,
        lastUpdate: currentZoneTrack.arrival,
        estimatedDuration: 0,
      };


      Zone.find((error, zones) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          zones.sort((a, b) => b.order > a.order);
          console.log(currentZoneTrack.zoneName);
          const zoneOrderPosition = zones.filter((zone) => {
            return zone.name === currentZoneTrack.zoneName;
          })[0].order;
          jsonResponse.currentZoneIndex = zoneOrderPosition;
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

