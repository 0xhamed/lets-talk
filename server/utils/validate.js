const redis = require('./redis');

exports.validateInputs = ({ name, roomName, password }) => {
  switch (true) {
    case !name.trim() || name.length > 50:
      return false;

    case !roomName.trim() || roomName.length > 50:
      return false;

    case !password || roomName.length > 50:
      return false;
  }

  return { name: name.trim(), roomName: roomName.trim(), password };
};

exports.validateUser = async (roomName, socketId, sdp, to) => {
  if (!roomName || !sdp || !to) return false;
  const exists = await redis.hexists(roomName, socketId);
  if (!exists) return false;
  return true;
};
