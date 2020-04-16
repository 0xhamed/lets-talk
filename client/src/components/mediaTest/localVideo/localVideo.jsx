import React from 'react';
import Video from '../../common/video/';

const LocalVideo = ({ stream }) => {
  return (
    <Video
      className={'test_local_video' + (stream ? 'hightlight' : '')}
      muted={true}
      srcObject={stream}></Video>
  );
};

export default LocalVideo;
