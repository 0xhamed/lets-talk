import React from 'react';

const InputListItem = props => {
  const { isSelected, handleSelect, text } = props;

  return (
    <React.Fragment>
      <li
        className={'input_list_item' + (isSelected ? ' selected' : '')}
        onClick={handleSelect}>
        {text}
      </li>
      <li className='divider'></li>
    </React.Fragment>
  );
};

export default InputListItem;
