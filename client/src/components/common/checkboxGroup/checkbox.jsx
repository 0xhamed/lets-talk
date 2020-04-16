import React from 'react';

const Checkbox = ({ checked }) => {
  return <span className={'checkbox ' + (checked ? 'checked ' : '')}></span>;
};

export default Checkbox;
