// Importing the Knex module (that works with connection and migrations)
const knex = require('knex');

// Importing the Data Base settings
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// Creating the connection 
const connection = knex(config);

// Exporting our connection with Data Base
module.exports = connection;