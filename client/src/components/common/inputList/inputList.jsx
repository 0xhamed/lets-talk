import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import InputListItem from './inputListItem';

const InputList = props => {
  const { items, defaultItemText, handleSelect, selectedItemIndex } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className='input_list_container'
      onClick={() => items[0] && setIsOpen(!isOpen)}>
      <span className='input_list_default unselectable'>{defaultItemText}</span>

      {items[1] && (
        <span className='input_list_arrow unselectable'>
          <MdKeyboardArrowDown />
        </span>
      )}

      <ul
        className='input_list'
        style={{ transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}>
        {items.map((item, i) => (
          <InputListItem
            key={item.id}
            isSelected={i === selectedItemIndex}
            handleSelect={handleSelect(i)}
            text={item.text}
          />
        ))}
      </ul>
    </div>
  );
};

export default InputList;
