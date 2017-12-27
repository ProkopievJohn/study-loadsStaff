'use strict';

var env = process.env.NODE_ENV || 'development'; // development by default
var config = {};
console.log(env);

if (env === 'development') {
  config = require('./dev.js'); // development.js has priority
} else {
  config = require('./' + env); // if local.js is not present, get config with environment name
}

module.exports = config;