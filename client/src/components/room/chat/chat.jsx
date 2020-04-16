import React, { useState, useEffect, useRef } from 'react';
import Input from '../../common/input/';
import { MdClose } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import autoScroll from './utils/autoScroll';

const Chat = props => {
  const { messages, toggleChat, handleMsgSubmit } = props;

  const [messageInput, setMessageInput] = useState('');
  const msgsContainerRef = useRef();

  useEffect(() => {
    autoScroll(msgsContainerRef.current);
  }, [messages]);

  const handleChange = e => {
    setMessageInput(e.target.value);
  };

  return (
    <div className='chat'>
      <div className='chat_wrapper'>
        <div className='chat_exit' onClick={toggleChat}>
          <MdClose />
        </div>
        <ul className='chat_messages' ref={msgsContainerRef}>
          {messages.map(m => (
            <li key={uuidv4()}>
              <span className='message_name'>{m.name}:</span> {m.text}
            </li>
          ))}
        </ul>

        <Input
          className='chat_input'
          value={messageInput}
          onChange={handleChange}
          handleKeyUp={e =>
            handleMsgSubmit(e, messageInput, () => setMessageInput(''))
          }
        />
      </div>
    </div>
  );
};

export default Chat;
