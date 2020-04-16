import React from 'react';
import Video from '../../common/video/';
import LocalVideoSettings from './localVideoSettings/';

const LocalVideo = props => {
  const { gState } = props;

  return (
    <div className='room_local_video'>
      <Video
        className={gState.stream ? 'hightlight' : ''}
        muted={true}
        srcObject={gState.stream}
        videoStyle={{
          visibility:
            gState.videoEnabled || gState.displayEnabled ? 'visible' : 'hidden'
        }}
      />

      <LocalVideoSettings {...props} />
    </div>
  );
};

export default LocalVideo;
