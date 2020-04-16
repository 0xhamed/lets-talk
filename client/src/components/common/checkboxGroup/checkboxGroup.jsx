import React from 'react';
import Checkbox from './checkbox';

const CheckboxGroup = props => {
  const { disabled, available, enabled, handleToggle, label } = props;

  return (
    <div
      className={'checkbox_group ' + (disabled ? 'disabled ' : '')}
      onClick={() => available && handleToggle()}>
      <Checkbox checked={enabled} />
      <span className='checkbox_label unselectable'>{label}</span>
    </div>
  );
};

export default CheckboxGroup;
