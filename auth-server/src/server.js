'use strict';

const express = require('express');

const notFoundHandler = require('../../src/error-handlers/404.js');
const errorHandler = require('../../src/error-handlers/500.js');
const logger = require('../../src/middleware/logger.js');

const v1Routes = require('../../src/routes/v1.js');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
