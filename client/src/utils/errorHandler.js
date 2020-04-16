export default function(resetState) {
  return function(ex, { isFatal = true, message, from } = {}) {
    if (isFatal) {
      ex && console.log(ex);
      if (message) alert(message);
      else alert('unexpected error occured!');
      this && this.socket && this.socket.close();
      resetState();
    } else {
      this.socket.emit('removed', { to: from }); // todo
      const { [from]: user, ...users } = this.state.users;
      this.setState({ users });
    }
  };
}
