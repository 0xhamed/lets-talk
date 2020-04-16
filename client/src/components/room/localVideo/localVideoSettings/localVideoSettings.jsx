import React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaListUl } from 'react-icons/fa';
import {
  MdVideocam,
  MdVideocamOff,
  MdScreenShare,
  MdStopScreenShare,
  MdClose,
  MdChat
} from 'react-icons/md';

const LocalVideoSettings = props => {
  const {
    gState,
    toggleDisplayCapture,
    toggleRemoteMedia,
    handleExit,
    toggleDevicesLists,
    toggleChat,
    showDevicesListsOption
  } = props;

  return (
    <div className='room_local_video_settings'>
      <span onClick={handleExit}>
        <MdClose />
      </span>

      {showDevicesListsOption && (
        <span onClick={toggleDevicesLists}>
          <FaListUl />
        </span>
      )}

      <span onClick={toggleChat}>
        <MdChat />
      </span>

      <span onClick={() => toggleDisplayCapture()}>
        {gState.displayEnabled ? <MdScreenShare /> : <MdStopScreenShare />}
      </span>

      <span onClick={() => gState.videoAvailable && toggleRemoteMedia('video')}>
        {gState.videoAvailable && gState.videoEnabled ? (
          <MdVideocam />
        ) : (
          <MdVideocamOff />
        )}
      </span>

      <span onClick={() => gState.audioAvailable && toggleRemoteMedia('audio')}>
        {gState.audioAvailable && gState.audioEnabled ? (
          <FaMicrophone />
        ) : (
          <FaMicrophoneSlash />
        )}
      </span>
    </div>
  );
};

export default LocalVideoSettings;
