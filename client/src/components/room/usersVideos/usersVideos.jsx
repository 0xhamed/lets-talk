import React, { PureComponent } from 'react';
import UserVideo from './userVideo/';

class UsersVideos extends PureComponent {
  render() {
    const { users } = this.props;
    const usersKeys = Object.keys(users);
    const rows = Math.ceil(usersKeys.length / 2);

    const gridTemplateRows = usersKeys[2] ? `repeat(${rows}, 1fr)` : '1fr';
    const gridTemplateColumns = usersKeys[1] ? '1fr 1fr' : '1fr';

    return (
      <div id='users_grid' style={{ gridTemplateColumns, gridTemplateRows }}>
        {usersKeys.map(i => (
          <UserVideo
            key={i}
            userName={users[i].name}
            srcObject={users[i].stream}
            visibility={users[i].hidden ? 'hidden' : 'visible'}
          />
        ))}
      </div>
    );
  }
}

export default UsersVideos;
