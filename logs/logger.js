const winston = require('winston');

require('winston-mongodb');
const LEVEL = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: './logs/error.log',
      level: LEVEL.error
    }),
    new winston.transports.File({
      filename: './logs/warns.log',
      level: LEVEL.warn
    }),
    new winston.transports.File({ filename: './logs/combined.log' })
  ]
});

module.exports = logger;
