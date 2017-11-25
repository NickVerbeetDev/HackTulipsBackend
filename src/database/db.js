const config = require('../config/config');
const mongoose = require('mongoose');

function connect() {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    },
  };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}

module.exports = {
  connect,
};
