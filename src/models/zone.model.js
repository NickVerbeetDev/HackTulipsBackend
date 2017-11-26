const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({
  name: String,
  estimatedDuration: Number,
});

module.exports = mongoose.model('Zone', zoneSchema);

