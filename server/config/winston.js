import winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true,
      timestamp: true,
      prettyPrint: true
    }),
    new (winston.transports.File)({
      name: 'info-file',
      filename: './logs/filelog-info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: './logs/filelog-error.log',
      level: 'error'
    })
  ],
  bodyWhitelists: ['username', 'email', 'age'],
  bodyBlacklists: ['username', 'password', 'confirm-password', 'top-secret'],
  responseWhitelists: ['_headers'],
  requestWhitelists: ['_headers']
});

logger.info(`Testing Winston ${logger}`);
logger.log('info', `Instantiating Test Log at ${new Date().toUTCString()}`);
logger.log('error', `Instantiating Test Log at ${new Date().toUTCString()}`);
export default logger;
