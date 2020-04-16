import React, { useState } from 'react';

const Input = props => {
  const [iValue, setIValue] = useState('');

  const handleChange = e => {
    setIValue(e.target.value);
  };

  const {
    type = 'text',
    className = '',
    name = '',
    value = iValue,
    onChange = handleChange,
    placeUp = iValue,
    placeholder = '',
    required,
    validate,
    spellCheck = 'false',
    autoComplete = 'off',
    handleKeyUp = () => {}
  } = props;

  return (
    <div className={'input_group' + ((placeUp && ' place_up') || '')}>
      <input
        type={type}
        className={
          `input ${className}` +
          ((validate && required && !value && ' invalid') || '')
        }
        name={name}
        value={value}
        onChange={onChange}
        spellCheck={spellCheck}
        autoComplete={autoComplete}
        onKeyUp={handleKeyUp}
      />
      {placeholder && <span className='placeholder'>{placeholder}</span>}
    </div>
  );
};

export default Input;
