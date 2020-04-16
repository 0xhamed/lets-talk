import React, { Component } from 'react';
import LocalVideo from './localVideo/';
import MediaState from './mediaState/';
import DevicesLists from '../common/devicesLists/';
import Actions from './actions/';
import helpers from './utils/helpers';

class MediaTest extends Component {
  constructor(props) {
    super(props);
    helpers.call(this);
    this.state = {
      inputsLocked: false
    };
  }

  render() {
    const { gHelpers, gState } = this.props;
    const { inputsLocked } = this.state;
    return (
      <div className='container' id='test'>
        <LocalVideo stream={gState.stream} />

        <div id='test_options'>
          <MediaState
            gState={gState}
            toggleMediaState={gHelpers.toggleMediaState}
          />
          {(!inputsLocked || !gState.isMobile) && (
            <DevicesLists
              gState={gState}
              selectDevice={gHelpers.selectDevice}
            />
          )}
        </div>

        <Actions
          inputsLocked={inputsLocked}
          isMobile={gState.isMobile}
          handleStart={this.handleStart}
          lock={this.lock}
        />
      </div>
    );
  }
}

export default MediaTest;
