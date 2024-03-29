const express = require('express');
const Zone = require('../models/zone.model');

const router = express.Router();

router.get('/:name', (req, res) => {
  console.log(req.params.name);
  Zone.find({ 'name' : req.params.name }, (err, zones) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (zones.length > 0) {
      res.json({
        name: zones[0].name,
        estimatedDuration: zones[0].estimatedDuration,
        order: zones[0].order,
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
  console.log('PUT: ', req.params.name);
  Zone.find({ 'name' : req.params.name }, (err, zones) => {
    console.log('PUT: ', zones);
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (zones.length > 0) {
      const zone = zones[0];
      zone.name = req.body.name || zone.name;
      zone.estimatedDuration = req.body.estimatedDuration || zone.estimatedDuration;
      zone.order = req.body.order || zone.order;
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

router.delete('/:name', (req, res) => {
  Zone.find({ 'name' : req.params.name }).remove((err) => {
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
  const order = req.body.order;

  if (name && name !== ''
    && typeof estimatedDuration !== 'undefined' && estimatedDuration !== ''
    && typeof order !== 'undefined' && order !== '') {
    const newZone = new Zone();
    newZone.name = name;
    newZone.estimatedDuration = estimatedDuration;
    newZone.order = order;
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

