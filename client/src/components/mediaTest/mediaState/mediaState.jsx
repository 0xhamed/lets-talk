import React from 'react';
import CheckboxGroup from '../../common/checkboxGroup/';

const MediaState = ({ gState, toggleMediaState }) => {
  return (
    <div id='media_state'>
      <CheckboxGroup
        disabled={!gState.audioAvailable}
        available={gState.audioAvailable}
        enabled={gState.audioEnabled}
        label='Audio'
        handleToggle={() => toggleMediaState('audio')}
      />

      <CheckboxGroup
        disabled={!gState.videoAvailable}
        available={gState.videoAvailable}
        enabled={gState.videoEnabled}
        label='Video'
        handleToggle={() => toggleMediaState('video')}
      />
    </div>
  );
};

export default MediaState;
