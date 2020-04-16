const path = require('path');
const fs = require('fs');

class Logger {
  constructor(dir) {
    this.dir = dir || process.cwd() + `/logs/`;
  }

  log = (type, ex) => {
    if (process.env.NODE_ENV !== 'production')
      console.log(ex.message, ex.stack || '');

    const log = {
      time: new Date(new Date().getTime()),
      message: ex.message,
      stack: ex.stack || undefined
    };

    if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
    fs.appendFileSync(`${this.dir}/${type}.log`, JSON.stringify(log) + '\n');
  };

  fatal = ex => {
    this.log('fatal', ex);
    process.exit(1);
  };

  sockets = ex => this.log('sockets', ex);

  info = message => this.log('info', { message });
}

const log = new Logger(path.join(__dirname, `../logs/`));

module.exports = log;
