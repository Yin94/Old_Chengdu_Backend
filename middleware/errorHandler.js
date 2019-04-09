const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../logs/logger');
function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(400).send('error encountered serverside');
    if (err.message) logger.log('error', err.message);
    else logger.log('error', err);
  }
}

module.exports = errorHandler;
