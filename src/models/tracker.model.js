const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  trackingId: String,
  flightId: String,
  userId: String,
});

module.exports = mongoose.model('Tracker', userSchema);

