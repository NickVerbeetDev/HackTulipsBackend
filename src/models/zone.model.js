const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({
  name: String,
  estimatedDuration: 30,
});

module.exports = mongoose.model('Zone', zoneSchema);

