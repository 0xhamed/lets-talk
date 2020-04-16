import React, { PureComponent } from 'react';
import Video from '../../../common/video/';
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import { FiMaximize } from 'react-icons/fi';

class UserVideo extends PureComponent {
  state = {
    muted: false,
    maximized: false
  };

  componentDidMount() {
    this.handleExitFullScreen();
  }

  handleExitFullScreen = () => {
    const ePrefixes = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'msfullscreenchange'
    ];
    ePrefixes.forEach(p => {
      document.addEventListener(p, () => {
        // leaving fullscreen
        if (!document.fullscreenElement)
          if (this.state.maximized) this.setState({ maximized: false });
      });
    });
  };

  toggleMute = () => {
    this.setState({ muted: !this.state.muted });
  };

  toggleMaximize = () => {
    this.setState({ maximized: !this.state.maximized });
  };

  render() {
    const { userName, srcObject, visibility } = this.props;
    const { muted, maximized } = this.state;

    return (
      <>
        <Video
          className='user_video'
          srcObject={srcObject}
          videoStyle={{ visibility }}
          muted={muted}
          maximized={maximized}>
          <div className='user_settings'>
            <span>{userName}</span>

            <span className='user_settings_icons'>
              <span onClick={this.toggleMute}>
                {muted ? <MdVolumeOff /> : <MdVolumeUp />}
              </span>
              <span onClick={this.toggleMaximize}>
                <FiMaximize />
              </span>
            </span>
          </div>
        </Video>
      </>
    );
  }
}

export default UserVideo;
