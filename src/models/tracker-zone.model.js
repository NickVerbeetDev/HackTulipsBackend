const mongoose = require('mongoose');

const trackerZoneSchema = mongoose.Schema({
  trackerId: String,
  zoneName: String,
  arrival: Number,
});

module.exports = mongoose.model('TrackerZone', trackerZoneSchema);

