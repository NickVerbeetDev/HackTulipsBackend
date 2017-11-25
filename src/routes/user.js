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

module.exports = router;

