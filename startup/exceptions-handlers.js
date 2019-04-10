const logger = require('../logs/logger');
const winston = require('winston-callback');

winston.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ colors: ['red', 'yellow'] }),
      winston.format.timestamp(),
      winston.format.simple()
    )
  })
);
//
module.exports = (() => {
  //handle uncaught exceptions listener
  process.on('uncaughtException', error => {
    if (error.message === 'jwtPrivateKey not issued!') {
      winston.log('error', error.message);
      process.exit(1);
    } else {
      logger.log('error', error.message, function callback(params) {
        winston.log(
          'error',
          'Uncaught exception: please check log for details!'
        );
        process.exit(1);
      });
    }
  });
})();
