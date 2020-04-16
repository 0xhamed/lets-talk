import React, { useState } from 'react';
import Input from '../../common/input/';
import Button from '../../common/button/';
import errorHandler from '../../../utils/errorHandler';

const JoinForm = props => {
  const { setDevices, saveInputs, setActivePage, resetState } = props.gHelpers;

  const [inputs, setInputs] = useState({
    name: '',
    roomName: '',
    password: ''
  });

  const [validation, setValidation] = useState(false);

  const handleChange = e => {
    e.persist();
    setInputs(current => ({ ...current, [e.target.name]: e.target.value }));
  };

  const eHandler = errorHandler(resetState);

  const handleJoin = async e => {
    e.preventDefault();
    setValidation(true);

    if (!inputs.name || !inputs.roomName || !inputs.password) return;

    try {
      await setDevices();
      saveInputs(inputs);
      setActivePage('test');
    } catch (ex) {
      console.log('here');
      eHandler(ex);
    }
  };

  return (
    <form id='join_form'>
      <h2>Join or Create a Room</h2>
      <Input
        type='text'
        value={inputs.name}
        name='name'
        onChange={handleChange}
        placeholder='Display Name'
        placeUp={inputs.name}
        validate={validation}
        required={true}
      />

      <Input
        type='text'
        className='join_input'
        value={inputs.roomName}
        name='roomName'
        onChange={handleChange}
        placeholder='Room Name'
        placeUp={inputs.roomName}
        validate={validation}
        required={true}
      />

      <Input
        type='password'
        className='join_input'
        value={inputs.password}
        name='password'
        onChange={handleChange}
        placeholder='Password'
        placeUp={inputs.password}
        validate={validation}
        required={true}
      />

      <Button
        className='btn_primary'
        text='Join / Create'
        handleClick={handleJoin}
      />
    </form>
  );
};

export default JoinForm;
