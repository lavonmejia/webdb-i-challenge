const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


const routes = require('./routes');

server.use('/api/accounts', routes);

module.exports = server;