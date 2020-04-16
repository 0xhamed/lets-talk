const server = require('./express');
const io = require('socket.io')(server);
const redis = require('../utils/redis');
const { validateInputs, validateUser } = require('../utils/validate');
const eHandler = require('../utils/errorHandler');

io.on('connection', socket => {
  socket.on(
    'join',
    eHandler(async inputs => {
      const newInputs = validateInputs(inputs);
      if (!newInputs) return socket.emit('customError', 'Please Authinticate!');

      const { name, roomName, password } = newInputs;
      const roomExists = await redis.exists(roomName);

      let isAuth, room;
      if (roomExists) {
        const roomPass = await redis.hget(roomName, 'password');
        if (roomPass !== password)
          return socket.emit('customError', 'Invalid Password!');
        await redis.hset(roomName, socket.id, name);
        room = await redis.hgetall(roomName);
        isAuth = true;
      } else {
        await redis.hmset(
          roomName,
          socket.id,
          name,
          'password',
          password,
          'ex',
          3110400 // a day
        );
        room = await redis.hgetall(roomName);
        isAuth = true;
      }

      if (isAuth) {
        socket.join(roomName);
        room.password = undefined;
        io.to(roomName).emit('room', { room });
        socket.roomName = roomName;
        socket.to(roomName).emit('createOffer', { from: socket.id });
      }
    }, socket)
  );

  socket.on(
    'offer',
    eHandler(async ({ sdp, to }) => {
      const valid = await validateUser(socket.roomName, socket.id, sdp, to);
      if (valid) io.to(to).emit('createAnswer', { sdp, from: socket.id });
    }, socket)
  );

  socket.on(
    'answer',
    eHandler(async ({ sdp, to }) => {
      const valid = await validateUser(socket.roomName, socket.id, sdp, to);
      if (valid) io.to(to).emit('answer', { sdp, from: socket.id });
    }, socket)
  );

  socket.on(
    'candidate',
    eHandler(async ({ candidate, to }) => {
      const valid = await validateUser(
        socket.roomName,
        socket.id,
        candidate,
        to
      );
      if (valid) io.to(to).emit('candidate', { candidate, from: socket.id });
    }, socket)
  );

  socket.on('hideStream', () => {
    if (!socket.roomName) return;
    socket.to(socket.roomName).emit('hideStream', { from: socket.id });
  });

  socket.on('showStream', () => {
    if (!socket.roomName) return;
    socket.to(socket.roomName).emit('showStream', { from: socket.id });
  });

  socket.on(
    'removed',
    eHandler(({ to }) => {
      if (!to) return;
      io.to(to).emit('userLeft', { id: socket.id });
    }, socket)
  );

  socket.on('disconnect', async () => {
    const roomName = socket.roomName;
    if (!roomName) return;
    await redis.hdel(roomName, socket.id);
    socket.to(roomName).emit('userLeft', { id: socket.id });
  });
});
