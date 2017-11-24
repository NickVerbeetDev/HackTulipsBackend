const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.post('/course', (req, res) => {
  console.log(req.url);
  console.log(req.body);
  console.log('=============');
  console.log(req.session);
  res.sendStatus(200);
});

module.exports = router;
