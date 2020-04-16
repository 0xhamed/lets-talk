import React, { Component } from 'react';
// eslint-disable-next-line
import adapter from 'webrtc-adapter';

import helpers from './utils/helpers';

import MediaTest from '../mediaTest/';
import Home from '../home/';
import Room from '../room/';

class App extends Component {
  constructor() {
    super();
    this.helpers = helpers.call(this);
    this.state = this.helpers.getInitialState();
  }

  componentDidMount() {
    if (!navigator.mediaDevices.getUserMedia)
      this.setState({ notSupported: true });

    this.helpers.handleBack();
  }

  render() {
    const { activePage } = this.state;

    if (activePage === 'home')
      return <Home gState={this.state} gHelpers={this.helpers} />;
    else if (activePage === 'test')
      return <MediaTest gState={this.state} gHelpers={this.helpers} />;
    else if (activePage === 'room')
      return <Room gState={this.state} gHelpers={this.helpers} />;
  }
}

export default App;
