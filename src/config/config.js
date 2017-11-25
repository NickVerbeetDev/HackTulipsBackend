const path = require('path');
const extend = require('util')._extend;

const development = require('./env/development.environment');

const defaults = {
  root: path.normalize(`${__dirname}/..`),
};

module.exports = {
  development: extend(development, defaults),
}[process.env.NODE_ENV || 'development'];
