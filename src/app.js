const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const session = require('express-session');
const db = require('./database/db');

db.connect();

const app = express();
app.enable('trust proxy');

const isProduction = process.env.NODE_ENV === 'production';

app.use(session({ secret: 'keyboard cat', cookie: { secure: true } }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

if (!isProduction) {
  app.use(errorhandler());
}

app.use('/health-check', require('./routes/health-check'));
app.use('/user', require('./routes/user'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    console.log(err.stack);

    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
