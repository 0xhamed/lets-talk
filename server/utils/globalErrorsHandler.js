const log = require('./logger');

process.on('uncaughtException', ex => {
  log.fatal(ex);
});

process.on('unhandledRejection', ex => {
  log.fatal(ex);
});
