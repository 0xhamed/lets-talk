import React from 'react';

const Button = ({ text, handleClick, className = '' }) => {
  return (
    <button className={'btn unselectable ' + className} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
