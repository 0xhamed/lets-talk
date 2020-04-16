import React from 'react';
import InputList from '../../inputList/';

const DevicesList = ({ devices, type, handleSelect, selected }) => {
  const defaultItemText = devices[0]
    ? devices[selected.i].label || devices[selected.i].deviceId
    : 'No Devices Found!';

  const newDevices = devices.map(d => {
    return {
      id: d.deviceId,
      text: d.label || d.deviceId
    };
  });

  return (
    <InputList
      items={newDevices}
      defaultItemText={defaultItemText}
      handleSelect={i => () => handleSelect(type, i)}
      selectedItemIndex={selected.i}
    />
  );
};

export default DevicesList;
