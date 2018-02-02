const knexfile = require('../knexfile.js');

// The knex package exports a function. Call this function
// the configuration object from knexfile for your
// app's current running environment. (e.g. development,
// production, staging, testing, etc)
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexfile[environment]);

module.exports = knex;
