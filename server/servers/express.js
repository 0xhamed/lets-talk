const log = require('../utils/logger');
const config = require('../config');
const https = require('https');
const express = require('express');
const app = express();
const fs = require('fs');

const httpsOptions = {
  cert: fs.readFileSync(config.cert),
  key: config.key && fs.readFileSync(config.key)
};

app.use(express.static(config.buildPath));

const server = https.Server(httpsOptions, app).listen(config.port, () => {
  log.info('https://localhost:' + config.port);
});

app.get('*', (req, res) => {
  res.sendFile(config.buildPath);
});

module.exports = server;
