import React from 'react';
import Button from '../../common/button/';

const Actions = props => {
  const { inputsLocked, isMobile, handleStart, lock } = props;

  return (
    <div id='actions'>
      <Button className='btn_primary' text='Start' handleClick={handleStart} />

      {(!inputsLocked || !isMobile) && (
        <Button className='btn_secondary' text='Test' handleClick={lock} />
      )}
    </div>
  );
};

export default Actions;
