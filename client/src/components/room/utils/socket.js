import initPeer from './initPeer';

export default function() {
  this.socket.on('connect', () => {
    this.socket.emit('join', this.props.gHelpers.getInputs());
    this.setState({ connectionStage: 'Authenticating' });
  });

  this.socket.on('disconnect', () => {
    !this.props.gState.exitedManually &&
      alert('You have been disconnected from the server!');
    this.props.gHelpers.resetState();
  });

  this.socket.on('customError', message => {
    this.eHandler(null, { message });
  });

  this.socket.on('room', ({ room }) => {
    this.setState({ connectionStage: '', room });
  });

  this.socket.on('createOffer', ({ from }) => {
    this.initiate(from);
  });

  this.socket.on('createAnswer', async ({ sdp, from }) => {
    await initPeer
      .call(this, { from, stream: this.props.gState.stream, sdp })
      .catch(ex => {
        this.eHandler(ex, { isFatal: false, from });
      });
  });

  this.socket.on('answer', async ({ sdp, from }) => {
    const user = this.state.users[from];
    await user.peer
      .setRemoteDescription(sdp)
      .catch(ex => this.eHandler(ex, { isFatal: false, from }));
  });

  this.socket.on('candidate', async ({ candidate, from }) => {
    const user = this.state.users[from];
    await user.peer
      .addIceCandidate(candidate)
      .catch(ex => this.eHandler(ex, { isFatal: false, from }));
  });

  this.socket.on('hideStream', ({ from }) => {
    const user = { ...this.state.users[from] };
    user.hidden = true;
    this.setState({ users: { ...this.state.users, [from]: user } });
  });

  this.socket.on('showStream', ({ from }) => {
    const user = { ...this.state.users[from] };
    user.hidden = false;
    this.setState({ users: { ...this.state.users, [from]: user } });
  });

  this.socket.on('userLeft', ({ id }) => {
    const { [id]: user, ...users } = this.state.users;
    this.setState({ users });
  });
}
