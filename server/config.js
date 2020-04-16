module.exports = {
  port: 3001,
  buildPath: './client/build/',
  cert: './server/certificates/cert.crt',
  key: './server/certificates/key.key',
  redis: {
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    password: null,
    db: 0
  }
};
