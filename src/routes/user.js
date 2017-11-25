const express = require('express');
const User = require('../models/user.model');

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

router.post('/', (req, res) => {
  const newUser = new User();
  newUser.name = req.body.name;
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

module.exports = router;

