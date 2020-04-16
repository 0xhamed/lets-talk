export default async function initPeer({ initiator, stream, from, sdp }) {
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:numb.viagenie.ca',
        username: 'webrtc@live.com',
        credential: 'muazkh'
      }
    ]
  };

  const peer = new RTCPeerConnection(configuration);

  this.setState({
    users: {
      ...this.state.users,
      [from]: { name: this.state.room[from], peer }
    }
  });

  const dataChannel = peer.createDataChannel('roomDC');

  peer.ondatachannel = e => {
    const channel = e.channel;
    const user = { ...this.state.users[from], channel };
    this.setState({ users: { ...this.state.users, [from]: user } });
  };

  dataChannel.onmessage = e => {
    this.setState({
      messages: [
        ...this.state.messages,
        { name: this.state.room[from], text: e.data }
      ]
    });
  };

  peer.onicecandidate = ({ candidate }) => {
    if (candidate) this.socket.emit('candidate', { candidate, to: from });
  };

  peer.ontrack = ({ streams }) => {
    const stream = streams[0];
    const newUser = { ...this.state.users[from], stream };
    this.setState({ users: { ...this.state.users, [from]: newUser } });
  };

  stream && stream.getTracks().forEach(track => peer.addTrack(track, stream));

  if (initiator) {
    const constraints = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    };
    const lsdp = await peer.createOffer(constraints);
    await peer.setLocalDescription(lsdp);
    this.socket.emit('offer', { sdp: lsdp, to: from });
  } else {
    await peer.setRemoteDescription(sdp);
    const lsdp = await peer.createAnswer();
    await peer.setLocalDescription(lsdp);
    this.socket.emit('answer', { sdp: lsdp, to: from });
  }
}
