import React, { Component } from 'react';
import io from 'socket.io-client';
import errorHandler from '../../utils/errorHandler';
import socketHandlers from './utils/socket';
import helpers from './utils/helpers';
import LocalVideo from './localVideo/';
import UsersVideos from './usersVideos/';
import RoomStage from './roomStage/';
import DevicesLists from '../common/devicesLists/';
import Chat from './chat/';

class Room extends Component {
  constructor(props) {
    super(props);
    helpers.call(this);
    this.eHandler = errorHandler.call(this, props.gHelpers.resetState);
    this.state = {
      room: null,
      users: {},
      connectionStage: 'Connecting',
      showDevicesLists: false,
      showChat: false,
      messages: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.socket = io('/', { secure: true });
    socketHandlers.call(this);

    setTimeout(() => {
      if (this.state.connectionStage === 'Connecting') {
        alert("we couldn't connect you to the server");
        this.props.gHelpers.resetState();
      }
    }, 10000);
  }

  componentWillUnmount = () => {
    this.socket && this.socket.close();
    const { stream } = this.props.gState;
    stream &&
      stream.getTracks &&
      stream.getTracks().forEach(track => track.stop());
  };

  render() {
    const { gState } = this.props;
    const {
      room,
      users,
      connectionStage,
      showDevicesLists,
      messages
    } = this.state;

    return (
      <div className='container' id='room'>
        <RoomStage
          room={room}
          users={users}
          connectionStage={connectionStage}
        />

        <LocalVideo
          gState={gState}
          toggleRemoteMedia={this.toggleRemoteMedia}
          toggleDisplayCapture={this.toggleDisplayCapture}
          handleExit={this.handleExit}
          toggleDevicesLists={this.toggleDevicesLists}
          toggleChat={this.toggleChat}
          showDevicesListsOption={!gState.isMobile}
        />

        {showDevicesLists && !gState.isMobile && (
          <DevicesLists gState={gState} selectDevice={this.selectDevice} />
        )}

        {this.state.showChat && (
          <Chat
            messages={messages}
            toggleChat={this.toggleChat}
            handleMsgSubmit={this.handleMsgSubmit}
          />
        )}

        {Object.keys(users)[0] && <UsersVideos users={users} />}
      </div>
    );
  }
}

export default Room;
