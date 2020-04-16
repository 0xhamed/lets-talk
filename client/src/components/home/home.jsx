import React from 'react';
import JoinForm from './joinForm/';

const Home = props => {
  return (
    <div className='container' id='home'>
      <span id='logo'>
        <img src='/icons/logo512.png' alt='logo' />
      </span>
      <JoinForm {...props} />
    </div>
  );
};

export default Home;
