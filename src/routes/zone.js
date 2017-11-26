const express = require('express');
const Zone = require('../models/zone.model');

const router = express.Router();

router.get('/:name', (req, res) => {
  Zone.find({ 'name' : req.param.name }, (err, zones) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (zones.length > 0) {
      res.json({
        name: zones[0].name,
        estimatedDuration: zones[0].estimatedDuration,
      });
    } else {
      res.json({});
    }
  });
});

router.get('/', (req, res) => {
  Zone.find({}, (err, zones) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(zones);
    }
  });
});

router.put('/:name', (req, res) => {
  console.log('PUT: ', req.param.name);
  Zone.find({ 'name' : req.param.name }, (err, zones) => {
    console.log('PUT: ', zones);
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (zones.length > 0) {
      const zone = zones[0];
      zone.name = req.body.name || zone.name;
      zone.estimatedDuration = req.body.estimatedDuration || zone.estimatedDuration;
      zone.save((error) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/:id', (req, res) => {
  Zone.find({ 'name' : req.param.name }).remove((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const estimatedDuration = req.body.estimatedDuration;

  if (name && name !== ''
    && estimatedDuration && estimatedDuration !== '') {
    const newZone = new Zone();
    newZone.name = name;
    newZone.estimatedDuration = parseInt(estimatedDuration, 10);
    newZone.save((err) => {
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

