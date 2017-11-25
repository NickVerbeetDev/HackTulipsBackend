const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  trackingId: String,
  flightId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Tracker', userSchema);

