// Importing the Knex module (that works with connection and migrations)
const knex = require('knex');

// Importing the Data Base settings
const configuration = require('../../knexfile');

// Creating the connection 
const connection = knex(configuration.development);

// Exporting our connection with Data Base
module.exports = connection;