import React from 'react';

const RoomStage = ({ connectionStage, users, room }) => {
  const usersKeys = Object.keys(users);

  if (usersKeys[0]) return <></>;

  const roomStageText = () => {
    if (!room) return connectionStage;
    else return 'Waiting for somebody to Join';
  };

  return <p className='room_stage loading'>{roomStageText()}</p>;
};

export default RoomStage;
