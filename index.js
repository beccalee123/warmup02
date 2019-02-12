'use strict';

const server = require('./server.js');

const port = process.env.PORT || 8080;

server.start(port);
