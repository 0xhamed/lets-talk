const log = require('./logger');

module.exports = (handler, socket) => {
  return async (...arguments) => {
    try {
      await handler(...arguments);
    } catch (ex) {
      socket.emit('customError', 'Internal Server Error!');
      socket.disconnect();
      log.sockets(ex);
    }
  };
};
