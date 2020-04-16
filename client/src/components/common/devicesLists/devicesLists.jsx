import React from 'react';
import DevicesList from './devicesList/';

const DevicesLists = props => {
  const { gState, selectDevice, className } = props;

  return (
    <div className={'devices_lists ' + (className ? className : '')}>
      <DevicesList
        devices={gState.audioDevices}
        type='audio'
        handleSelect={selectDevice}
        selected={gState.audioSelectedDevice || { i: 0 }}
      />

      <DevicesList
        devices={gState.videoDevices}
        type='video'
        handleSelect={selectDevice}
        selected={gState.videoSelectedDevice || { i: 0 }}
      />
    </div>
  );
};

export default DevicesLists;
