import initPeer from './initPeer';

export default function() {
  this.initiate = async from => {
    await initPeer
      .call(this, {
        initiator: true,
        stream: this.props.gState.stream,
        from
      })
      .catch(this.eHandler);
  };

  this.toggleRemoteMedia = async type => {
    if (type === 'video' && this.props.gState.displayEnabled)
      return alert('Please turn off screen sharing first.');

    const { users } = this.state;
    const toggledOn = await this.props.gHelpers.toggleMediaState(type);

    if (toggledOn) {
      for (let i in users) await this.initiate(i);
    } else {
      for (let i in users) {
        users[i].peer.getSenders().forEach(sender => {
          if (sender.track && sender.track.kind === type)
            users[i].peer.removeTrack(sender);
        });
      }
    }

    // this is only for removing the freezed picture when toggeling cam off
    type === 'video' &&
      this.socket.emit(toggledOn ? 'showStream' : 'hideStream');
  };

  this.toggleDisplayCapture = async isHandler => {
    try {
      let {
        isMobile,
        displayEnabled,
        videoEnabled,
        stream
      } = this.props.gState;
      const { users } = this.state;

      if (isMobile)
        return alert("This feature isn't available in mobile devices.");
      else if (!navigator.mediaDevices.getDisplayMedia)
        return alert(
          "This feature isn't aviable in your browser or browser version."
        );

      if (!displayEnabled) {
        const displayStream = await navigator.mediaDevices
          .getDisplayMedia()
          .catch(ex => {
            throw new Error(ex);
          });

        if (!stream) stream = displayStream;
        if (videoEnabled) await this.toggleRemoteMedia('video');

        displayStream.getTracks().forEach(t => {
          stream.addTrack(t);
          t.onended = () => this.toggleDisplayCapture(true);
        });

        this.props.gHelpers.setStream(stream);
        for (let i in users) await this.initiate(i);
      } else {
        if (!isHandler)
          return alert(
            'Please stop capturing the screen using the browser prompt.'
          );

        stream.getTracks().forEach(t => {
          if (t.kind === 'video') stream.removeTrack(t);
        });

        for (let i in users) {
          users[i].peer.getSenders().forEach(sender => {
            if (sender.track && sender.track.kind === 'video')
              users[i].peer.removeTrack(sender);
          });
        }
      }

      this.props.gHelpers.setMediaState('display', !displayEnabled);
      this.socket.emit(!displayEnabled ? 'showStream' : 'hideStream');
    } catch (ex) {
      console.log(ex);
    }
  };

  this.toggleDevicesLists = () => {
    this.setState({ showDevicesLists: !this.state.showDevicesLists });
  };

  this.toggleChat = () => {
    this.setState({ showChat: !this.state.showChat });
  };

  this.selectDevice = async (type, i) => {
    this.toggleDevicesLists();
    this.props.gHelpers.selectDevice(type, i);
    if (this.props.gState[type + 'Enabled']) await this.toggleRemoteMedia(type);
    this.toggleRemoteMedia(type);
  };

  this.handleMsgSubmit = (e, messageText, resetInput) => {
    if (messageText && e.keyCode === 13) {
      resetInput();
      this.setState({
        messages: [...this.state.messages, { name: 'Me', text: messageText }]
      });

      const { users } = this.state;
      for (let i in users) {
        users[i].channel.send(messageText);
      }
    }
  };

  this.handleExit = async () => {
    if (window.confirm('Are you sure you want to exit?')) {
      await this.props.gHelpers.setExitedManually();
      this.props.gHelpers.setActivePage('home');
    }
  };
}
